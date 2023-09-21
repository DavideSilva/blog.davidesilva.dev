---
title: A look into Cairo 1.0 traits
description: >-
  Starknet Regenesis is currently underway. There’s been an effort from
  Starkware  into improving not only the Cairo language but the entire
  ecosystem. We are currently in the transition period but there is already some
  new language features that we can play with. Let’s look at some of the new
  features of Cairo 1.
pubDatetime: 2023-05-10T10:00:00.000Z
tags:
  - Development
  - Cairo
  - Starknet
canonicalURL: 'https://blog.finiam.com/blog/a-look-into-cairo-1-0-traits'
---

[Starknet Regenesis](https://docs.starknet.io/documentation/starknet_versions/upcoming_versions/) is currently underway. There's been an effort from Starkware into improving not only the Cairo language but the entire ecosystem. We are currently in the transition period but there is already some new language features that we can play with. Let's look at some of the new features of Cairo 1.

![Regenesis](https://i.imgur.com/67MtrLF.png)

## Cairo likes Rust

If you have been following the updates from the Starkware team, you probably already know that the new Cairo 1 syntax is going to be very similar to Rust. Not only in terms of syntax but also some of the concepts introduced by Rust are being ported to Cairo, with Traits now being present in Cairo 1.

### Traits

What are traits? Traits are a concept in Rust that allow sharing a certain behaviour across types. It's very similar to *interfaces* in traditional OO languages, but with some key differences. In Cairo, traits don't behave exactly like you would expect if you are familiar with Rust, but it will feel similar.

In Cairo, we can define a trait by using the `trait` keyword followed by the name of the trait. In the `trait` block, we specify the signature of the functions that we want that specific trait to implement. Let's look at an example:

```rust
trait SuperComputer {
    fn the_ultimate_question() -> felt;
}

```

We defined our Trait, `SuperComputer`, and we said that every type that uses this trait needs to implement the `the_ultimate_question` function.
If a type wants to implement our trait, it will need to implement all the functions declared by our trait definition. Otherwise, the compiler will throw out an error saying `Not all trait items are implemented`.

A Trait implementation is defined by the `impl` keyword followed by the name of our implementation and the trait that we are implementing for:

```rust
impl DeepThought of SuperComputer {
    fn the_ultimate_question() -> felt {
        42
    }
}
```

If we now define a new implementation, `Marvin`, that also uses the `SuperComputer` trait, we are enforced by the compiler to implement the function `the_ultimate_question`.

```rust
impl Marvin of SuperComputer {
    fn the_ultimate_question() -> felt {
        5
    }
}
```

## Using Generics

The previous example was simply to introduce the concept of Traits. We can also make use of generics in order to make our Trait accept any type we want. We just need to implement our Trait for every type that uses it.

Let's imagine we want to represent a color in our Cairo program. We can follow the widely used RGB color model to define our color. We can have a struct that stores the value of red, green, and blue that make up our color. However, there are also other color models, like the CMYK color model, that use different attributes to represent the same color.

```rust
struct RGB {
    red: u8,
    green: u8,
    blue: u8,
}

struct CMYK {
    cyan: u8,
    magenta: u8,
    yellow: u8,
    black: u8,
}
```

If we wanted to have a way to find the color representation of the color red, using either color model, we could have a `ColorModelTrait<T>` that would accept any type `T`, in order to enforce a function `red` that would return, either a RGB or CMYK struct, with that representation. Like so:

```rust
trait ColorModelTrait<T> {
    fn red() -> T
}

impl RGBImpl of ColorModelTrait::<RGB> {
    fn red() -> RGB {
        RGB { red: 255, green: 0, blue: 0 }
    }
}

impl CMYKImpl of ColorModelTrait::<CMYK> {
    fn red() -> CMYK {
        CMYK { cyan: 0, magenta: 100, yellow: 100, black: 0 }
    }
}
```

With this in place, we can now use our ColorModelTrait to get a struct that will represent the color red. The `T` in the trait definition represents any possible type so we can specify if we want the RGB or CMYK type when calling our trait.

```rust
let rgb = ColorModelTrait::RGB::red();
let cmyk = ColorModelTrait::CMYK::red();
```

## Final thoughts

This brief post aims to show how we can use traits in Cairo. Obviously, there are many more concepts and new syntax to delve into. We are on a learning journey and are excited to share and exchange knowledge with you.

We are currently building a community for anyone interested in Cairo and Starknet in particular. Whether you're an experienced developer or just starting out, join our [Starknet Portugal on Telegram](https://t.me/starknetportugal) and [Starknet Portugal on Meetup](https://www.meetup.com/starknet-portugal) groups. Don't forget to also follow our socials where we will share more events soon.
