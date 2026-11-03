# Bitcoin Core Config Generator

[![CI](https://github.com/jlopp/bitcoin-core-config-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/jlopp/bitcoin-core-config-generator/actions/workflows/ci.yml) An online generator is [available here](https://jlopp.github.io/bitcoin-core-config-generator)

What is this?
-------------

[Bitcoin](https://bitcoin.org/) is the world's first peer-to-peer digital currency that has no central authority.
[Bitcoin Core](https://bitcoincore.org) is the original and most popular Bitcoin node software that anyone can use
to harness the full security features of the Bitcoin protocol and operate without trusting any third parties. However,
there are over 160 configuration options for Bitcoin Core and more are added with each release. This generator is meant
to expose and explain all of those options so that any user can make the most of the flexibility available to them.

Features
--------

Each configuration option is available via the user interface, grouped by what attributes they affect. For ease of
getting started with a new configuration, a variety of preset "node classes" are available on the right side of the
screen. Selecting a present will load our recommended base configuration for a node fitting that description, at which
point you can then tune the configuration at the single option level.

Available preset configurations:

* Mining: Suitable for miners who need to keep the entire UTXO set in RAM for fast block creation.
* Non-standard ports: For users who can't use the standard P2P or RPC ports
* Low Bandwidth: for users on metered connections; enforces bandwidth usage target
* Pruned: for users who want to limit their total disk usage. This also limits bandwidth usage.
* Raspberry Pi: for lower powered nodes with limited RAM & CPU
* Tor: for privacy conscious users
* Testnet: for developers using testnet coins
* Regtest: for developers creating their own test networks
* Non-Syncing: for developers who have a synced node but want to "freeze" the blockchain
* Lightning-Eclair: for users who are running an Eclair Lightning node

License
-------

The Bitcoin Core Config Generator is released under the terms of the GPL. See [LICENSE](LICENSE) for more information.
