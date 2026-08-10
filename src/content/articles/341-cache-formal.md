---
title: Formally verifying a tiny cache with JasperGold
slug: 341-cache-formal
description: A small project write-up about getting started with JasperGold by building a formal testbench for a tiny cache controller.
tags:
  - asic
  - hardware
  - formal verification
  - comp arch
img-preview: |
  /images/cache-fv/jg-4.png
date: 2026-08-08 00:26:00
public: true
---

This write-up is adapted from my End-of-Semester project for Carnegie Mellon's [18-341: "Logic Design & Verification"](https://courses.ece.cmu.edu/18341). My goal was to explore industry-standard Formal Verification flows for ASICs: take a small design (a cache controller), exhaustively test it, constrain the formal environment, poke holes until I break it, and generate some formal proofs.

Special thanks to [Prof. Bill Nace](https://www.ece.cmu.edu/directory/bios/nace-bill.html) for vetting this article before it goes online. 

Enjoy!

---

Iain Singleton's guest lecture on FV was honestly one of the coolest guest lectures I’ve attended at CMU. The JasperGold demo on the FIFO was especially clever and well put together, and it really demystified what “formal verification” actually means in practice. It made me want to try doing the same thing on a small design of my own.

Since I’m really excited to take [18-447 (Intro to Computer Architecture)](https://courses.ece.cmu.edu/18447) next semester, I decided to lean into that theme and build a tiny cache controller in RTL, then formally prove a few properties about how it behaves using SystemVerilog Assertions and JasperGold.

Given the time limit of ~4 hours for this mini-project, the goal was _not_ to fully verify a production-ready cache, but to:

- Design a small, self-contained cache controller,
- Write a handful of meaningful properties,
- Push them through JasperGold and learn what the FV workflow feels like end-to-end.

There’s still a lot more I’d like to explore (more interesting properties, deeper environment modeling, liveness, etc.), and I’m hoping to mess around with Jasper more over Winter break.

## Caches, 213-style

This section is heavily inspired by the 18-213 (Introduction to Computer Systems) material, which I took about a year ago. I had to brush off some rust and re-learn the basics before I could sensibly design and reason about even a tiny cache.

### Motivation

Consider a very simple computer system: a CPU core (ALU, register file, control, datapath, _RISC-240_ style) connected to main memory (RAM) over a memory bus. The CPU issues read/write requests over this bus:

- address,
- read/write control,
- write data (for stores),
- plus some handshaking.

A **memory controller** sits between the core and RAM. It:

- accepts requests from the CPU,
- reads/writes RAM,
- returns data on loads,
- enforces whatever timing/latency model the memory has.

![](/images/cache-fv/213-mem-subsystem.png)

The problem at hand is a classic one: **fast memory is small and expensive; large memory is slow and cheap.**

![](/images/cache-fv/213-mem-hierarchy.png)

If every load and store has to hit main memory, the CPU spends a lot of time waiting around for data. That’s where **caches** come in: small, fast SRAM that sits between the CPU and main memory. The cache stores a subset of memory contents (hopefully "hot" ones) and services most accesses locally. This works well in practice because programs tend to exhibit:

- **Temporal locality**: if you use something once, you’re likely to use it again soon.
- **Spatial locality**: if you use address `X`, you’re likely to use nearby addresses (`X+1`, `X+2`, …).

The whole point of the cache is to exploit that locality and avoid going to slow memory on every single access.

### How a cache works

Very roughly, a (set-associative) cache is organized using a few key concepts:

- **Sets**: The cache is divided into _sets_. An address maps to exactly one set, based on some subset of its bits.
- **Blocks (or cache lines)**: The cache stores blocks of consecutive bytes called _cache lines_. In my project, I simplified this and made each line exactly one word, so the “block size” is 1.
- **Tags**: For each cache line, we store some high-order address bits as the **tag**. When the CPU requests an address:
  - we find the corresponding set,
  - compare the tag in that set to the tag from the requested address,
  - if they match (and the line is valid), it’s a **cache hit**.
- **Block offset**: If the line contains multiple words, the **block offset** selects which word inside the cache line to use. In my design, lines are 1 word, so the offset is 0 bits.
- **Set associativity**:
  - _Direct-mapped_: 1 line per set (the simplest case).
  - _N-way associative_: multiple lines per set, and you pick which one to evict using some policy (LRU, random, etc.). I chose **direct-mapped** to keep the RTL and FV state space small.
- **Write-back vs write-through**:
  - _Write-through_: on a write hit, update both the cache and memory immediately.
  - _Write-back_: update only the cache and mark the line as dirty; write to memory later when the line is evicted.
  - I use **write-through** so I don’t need dirty bits or a more complicated eviction protocol for this project.
- **Write-allocate vs write-no-allocate (write-around)**:
  - _Write-allocate_: on a write miss, bring the block into the cache, then update it (and maybe memory).
  - _Write-no-allocate_: on a write miss, write directly to memory and do **not** bring the block into cache.  
     I chose **write-no-allocate** to simplify the miss-handling logic and keep the formal properties more tractable.

All of these knobs (associativity, line size, write policy) affect both performance and verification complexity. For a tiny 4-hour FV demo, I simplified aggressively.

### Our cache

Here’s the exact configuration I used for this project:

- **Address width:** 5 bits → 32 total addresses
- **Word width:** 8 bits
- **Number of sets:** 4
- **Associativity:** 1 (direct-mapped)
- **Lines per set:** 1
- **Line size:** 1 word (no block offset)
- **Write policy:** write-through
- **Write-miss policy:** write-no-allocate (write-around)

From that:

- Set index bits: `log2(4) = 2`
- Block offset bits: `0` (1-word lines)
- Tag bits: `5 – 2 – 0 = 3`

So the address is split as: `[ tag(3 bits) | index(2 bits) ]`

In the RTL, each cache line is just a small struct:

```verilog
typedef struct {
  logic       valid;
  logic [2:0] tag;
  logic [7:0] data;
} CacheLine_t;

CacheLine_t CACHE_LINES[4];  // one line per set
```

So the cache physically stores:

- 4× valid bits,
- 4× 3-bit tags,
- 4× 8-bit data words.
- Even for such a small design, you start to see how the control logic, address decoding, and update rules interact — which is exactly what I wanted to formalize and check using JasperGold.

## Cache RTL model

The cache controller is implemented as a small finite-state machine (FSM) that controls how CPU requests interact with the cache lines and the backing memory.

### FSM

![](/images/cache-fv/cache-fsm.png)

### Testbench

I also wrote a simple testbench with directed tests to sanity check my implementation.

## JasperGold

In the context of this project, I used JasperGold mainly to:

- **Prove local safety properties**. For example:
  - In `HIT_READ`, the response data matches the cached data
  - In `HIT_WRITE`, the write-through request to memory carries the correct address and data.
  - On a read miss, a memory response causes the correct cache line to be filled.
  - On a write miss (with write-no-allocate), the cache line contents don’t change.
- **Find counterexamples when my assumptions were wrong**: When I wrote properties that implicitly assumed a "nice" memory (e.g., always responding), JG produced counterexamples showing traces where `mem_resp_valid` never went high. This forced me to:
  - either constrain the environment with `assume property`, or
  - refine the properties to be more realistic.
- **Explore design behavior exhaustively**: JG explores all possible input combinations and state transitions (within the model and assumptions). This is particularly useful for catching corner cases in the FSM that would be very hard to hit with directed tests

For this 4-hour mini-project, I focused on a handful of small, local properties to get hands-on experience with the FV flow.

### Running JG

On the ECE machines, JasperGold is set up through the 18-224 class environment. To run it:

```
source /afs/ece.cmu.edu/class/ece224/setup_jasper

jg  <script.tcl>
```

### TCL

Here is the simple Tcl script I used to analyze and prove properties on the cache:

```tcl
clear -all

analyze -sv cache.sv

elaborate -disable_auto_bbox \
    -top cache

clock clock
reset reset -expression {reset}

set_engine_mode {B M G Hps Hts Tri}

prove -all
```

---

## Assertions I've proved

1. If we are in HIT_READ, then the response must be valid and equal to the cached data
2. In MISS_READ_REQ we must send a read request to memory
3. On a read-miss response, the cache line must be filled correctly

---

## Debugging

The first couple of properties were very straightforward. After wiring them up and running JasperGold, both passed immediately:

- `hit_read_returns_cached_data`
- `read_miss_sends_mem_read`

The waveform and property summary confirmed that the RTL and the properties agreed.

![](/images/cache-fv/jg-1.png)

When I added the third property:

```
property read_miss_fills_cache;
  @(posedge clock) disable iff (reset)
    (state == MISS_READ_WAIT && mem_resp_valid)
      |=> (CACHE_LINES[latched_req_addr[1:0]].valid &&
           CACHE_LINES[latched_req_addr[1:0]].tag   == latched_req_addr[4:2] &&
           CACHE_LINES[latched_req_addr[1:0]].data  == mem_resp_rdata);
endproperty

assert property (read_miss_fills_cache);
```

JasperGold reported a FAIL and generated a counterexample. Time to debug.

![](/images/cache-fv/jg-2.png)

Let's inspect the counter example:

![](/images/cache-fv/jg-3.png)

Hmm, this is hard to read. let's group the signals together in categories that make more sense:

![](/images/cache-fv/jg-4.png)

At first, the waveform was a bit noisy, so I grouped signals by category (state, CPU interface, memory interface, cache line state) to make it easier to read. What I saw:

- The memory request in `MISS_READ_REQ` looked correct.
- The assertion about `MISS_READ_REQ` was still passing.
- However, `mem_resp_valid` was doing something strange: it was asserted in ways that didn’t obviously line up with the requests.

This turned out to be the key hint: Jasper had no idea how my memory controller behaves.

From Jasper’s perspective:

- `mem_resp_valid` and `mem_resp_rdata` are just unconstrained inputs.
- There is no built-in notion of “memory must respond one cycle after a read request” or “memory only responds when asked.”

So it happily produced a counterexample where the memory’s response pattern violated what I was _implicitly assuming_ in my property.

To fix this, I added _assumptions_ that describe how the memory is allowed to behave. These are SVA properties written with `assume property` instead of `assert property`, and they constrain the environment:

1. Memory responds exactly one cycle after a read request
2. Memory only responds if there was a read request in the previous cycle

With these in place, JasperGold was no longer allowed to invent arbitrary mem_resp_valid behavior. The new traces showed mem_resp_valid cleanly following the requests, as intended.

However, the third property still failed. So the problem wasn’t just the environment.

![](/images/cache-fv/jg-5.png)

However, the third property still failed. So the problem wasn’t _just_ the environment.

![](/images/cache-fv/jg-6.png)

Looking more closely at the waveform and the failing trace, I realized the issue was with _when_ I was checking the cache contents.

In the RTL:

- The cache line is updated in an `always_ff` block when  
   `state == MISS_READ_WAIT && mem_resp_valid`.
- The update happens on the clock edge.

But in my property, I was checking:

```
(state == MISS_READ_WAIT && mem_resp_valid)
  |=> (CACHE_LINES[...] == mem_resp_rdata);

```

On the next cycle, the cache line reflects the data written on the previous edge. However, `mem_resp_rdata` in that next cycle is no longer guaranteed to hold the same value it had when the write occurred. It might change or be X/unconstrained.

What I actually want is:

> On the cycle after the response, the cache line’s `data` equals the value of `mem_resp_rdata` from the cycle when the response happened.

That’s exactly what sampled value functions like `$past` are for. The corrected property:

```
property read_miss_fills_cache;
  @(posedge clock) disable iff (reset)
    (state == MISS_READ_WAIT && mem_resp_valid)
      |=> (CACHE_LINES[latched_req_addr[1:0]].valid &&
           CACHE_LINES[latched_req_addr[1:0]].tag   == latched_req_addr[4:2] &&
           CACHE_LINES[latched_req_addr[1:0]].data  == $past(mem_resp_rdata));
endproperty

assert property (read_miss_fills_cache);
```

After this fix, JasperGold proved the property, and the waveform lined up with my mental model of the cache’s behavior.

![](/images/cache-fv/jg-7.png)

Et voilá!

---

## What's next?

### Missing properties

There are several natural properties I didn’t have time to formalize in this 4-hour window, for example:

- **Write hit:**
  - Cache line must be updated with the new data.
  - Memory must see the correct write-through request.
- **Write miss (no-write-allocate):**
  - Memory must see a write request.
  - The cache line for that index must remain unchanged.
- **Reset behavior:**
  - After reset, all `valid` bits should be 0.

These would further increase confidence that the cache controller is behaving according to the intended policy.

### Bounded proofs

All the properties I wrote are small, local safety properties that Jasper can prove exhaustively for this tiny design. For more complex designs, it’s common to:

- Use bounded proofs (prove properties up to a certain depth),
- Combine them with environment assumptions,
- And sometimes rely on induction (e.g., `prove -induct`) to generalize.

If I extend this project over Winter break, a natural next step would be to write a few deeper, more “end-to-end” properties (like “every accepted request eventually produces a response”) and explore how far Jasper can push those with bounded or inductive proofs.

## References

- 15-213/18-213 Lectures
  - https://www.cs.cmu.edu/~213/lectures/09-memory-hierarchy.pdf
  - https://www.cs.cmu.edu/~213/lectures/10-cache-memories.pdf
- CS:APP https://csapp.cs.cmu.edu/
- JasperGold Simplifying Formal video series on YouTube
  - https://www.youtube.com/watch?v=EW334PbMKIA&pp=ygUbc2ltcGxpZnlpbmcgZm9ybWFsIGNhZGVuY2Ug
  - https://www.youtube.com/watch?v=0cEkWpE5nUM&pp=ygUbc2ltcGxpZnlpbmcgZm9ybWFsIGNhZGVuY2Ug
  - https://www.youtube.com/watch?v=mkMF-3Xuafc&pp=ygUbc2ltcGxpZnlpbmcgZm9ybWFsIGNhZGVuY2Ug
