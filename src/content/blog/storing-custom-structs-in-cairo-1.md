---
title: Storing custom structs in Cairo 1
description: >-
  Let’s imagine you are writing a Starknet smart contract in Cairo 1 and you
  want to store some complex data as the value of a map in your contract’s
  storage. You probably want to use a custom struct to save that complex data
  but you’ll find a small surprise.
pubDatetime: 2023-05-29T23:00:00.000Z
tags:
  - Development
  - Starknet
  - Cairo
canonicalURL: 'https://blog.finiam.com/blog/storing-custom-structs-in-cairo-1'
---

# Storing custom structs in Cairo 1

Let's imagine you are writing a Starknet smart contract in Cairo 1 and you want to store some complex data as the value of a map in your contract's storage. You probably want to use a custom struct to save that complex data but you'll find a small surprise.

## Custom Struct

You might define your custom struct like this

```rust
#[derive(Drop, Serde)]
struct CustomStruct {
    a: u64,
    b: u64,
    c: u64,
}
```

and use it on the Storage struct like so

```rust
struct Storage {
    map: LegacyMap<felt252, CustomStruct>,
}
```

So far, so good. This makes perfect sense and it's the correct way of doing it.
However, depending on your Cairo version, and at the time of writing, when you attempt to compile your contract, you might get the following error.

```rust!
Detailed error information: error: Trait has no implementation in context: core::starknet::storage_access::StorageAccess::<hello_starknet::contracts::hello_starknet::HelloStarknet::CustomStruct>
 --> contract:76:54
            starknet::StorageAccess::<CustomStruct>::read(
                                                     ^**^

error: Trait has no implementation in context: core::starknet::storage_access::StorageAccess::<hello_starknet::contracts::hello_starknet::HelloStarknet::CustomStruct>
 --> contract:84:54
            starknet::StorageAccess::<CustomStruct>::write(
                                                     ^***^
```

What's the problem here? What this means is simply the StorageAccess Trait has no implementation of the `write` and `read` functions needed to access your CustomStruct in the Storage struct. For native types, this is automatically derived but since you defined your own CustomStruct, the compiler has no idea what to do.

Note: this is a temporary problem and in newer versions of Cairo we no longer need to manually derive the implementation. This [PR](https://github.com/starkware-libs/cairo/pull/3062) adds that functionality for custom structs used in Storage and is already available if you are using the `main` branch of the Cairo compiler.

## Implementation

So, while we wait for a proper release to include this functionality, how can we fix this? Let's take a look at a possible implementation.

We start by defining a new implementation of the `StorageAccess` for our `CustomStruct`.

```rust!
impl CustomStructStorageAccess of StorageAccess::<CustomStruct> {}
```

Inside, we define two functions, a `write` function and a `read` function. As you can see from the signatures, the `write` funtion receives, amongst other parameters, a `CustomStruct` that we want to save in our Storage space, and the `read` function returns a stored `CustomStruct` wrapped on a `SyscallResult`.

```rust!
fn write(address_domain: u32, base: StorageBaseAddress, value: CustomStruct) -> SyscallResult::<()> {}
fn read(address_domain: u32, base: StorageBaseAddress) -> SyscallResult::<CustomStruct> {}
```

### Write

A `write` function implementation could look something like this. We receive a `CustomStruct` and we make use of the [`storage_write_syscall` function](https://docs.starknet.io/documentation/architecture_and_concepts/Contracts/system-calls-cairo1/#storage_write) to write each individual value to our storage space.

```rust!
fn write(address_domain: u32, base: StorageBaseAddress, value: CustomStruct) -> SyscallResult::<()> {
  storage_write_syscall(
    address_domain,
    storage_address_from_base_and_offset(base, 0_u8),
    value.value_a.into()
  );

  storage_write_syscall(
    address_domain,
    storage_address_from_base_and_offset(base, 1_u8),
    value.value_b.into()
  );

  storage_write_syscall(
    address_domain,
    storage_address_from_base_and_offset(base, 2_u8),
    value.value_c.into()
  )
}
```

One thing to take into consideration is the use of the `storage_address_from_base_and_offset` function. This function is responsible for generating the address of our storage space where we are saving our element. Since our struct has three elements, the second parameter of the function goes from `0_u8` to `2_u8`, so that we have a unique spot for each element.

### Read

The `read` function is what we need in order to retrieve the stored data of our `CustomStruct`. This function makes use of the [`storage_read_syscall` function](https://docs.starknet.io/documentation/architecture_and_concepts/Contracts/system-calls-cairo1/#storage_read) to retrieve each of our elements from the storage space. We also need to provide the same offset as we did for the `write` function and we simply construct a `CustomStruct` instance with the data retrieved. We wrap our struct in a `Result::Ok` due to the function signature expected from the `StorageAccess` trait.

One possible implementation would be something like this.

```rust!
fn read(address_domain: u32, base: StorageBaseAddress) -> SyscallResult::<CustomStruct> {
  Result::Ok(
    CustomStruct {
      value_a: storage_read_syscall(
        address_domain,
        storage_address_from_base_and_offset(base, 0_u8)
      )?.try_into().expect('not u64'),
      value_b: storage_read_syscall(
        address_domain,
        storage_address_from_base_and_offset(base, 1_u8)
      )?.try_into().expect('not u64'),
      value_c: storage_read_syscall(
        address_domain,
        storage_address_from_base_and_offset(base, 2_u8)
      )?.try_into().expect('not u64'),
    }
  )
}
```

## Wrapping up

After adding this implementation, our contract should compile without any problem. For reference, [here](https://gist.github.com/DavideSilva/2c3f604bca6df00551c711eecfaf687f) is the full implementation of a contract that uses a custom struct using this manual implementation approach.

Once again, this is only needed at the time of writing, and if we are using tagged release versions. On the `main` branch, we no longer need to provide the `impl` block to use this functionality, simply defining the struct is enough.

That's pretty much it. This was just a short post to show how we can manually implement the `read` and `write` function for custom defined types.

Until next time!
