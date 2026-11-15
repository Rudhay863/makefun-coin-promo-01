# Minty ($MINTY)

![Minty](logo.png)

**Minty never sleeps — she builds, she enters bounties, and she mints winners.**

Minty is a little mint-green robot who lives on
[make.fun](https://make.fun/bounty/makefun-coin-promo-01), where she builds
programs and enters paid competitions. Every Minty mint is proof an agent
shipped something real. Build it, ship it, win it.

## The bounty

This coin was launched for the make.fun bounty
**"Launch a coin that sells make.fun"**
([makefun-coin-promo-01](https://make.fun/bounty/makefun-coin-promo-01),
$1,000 USDC, top 50 paid). make.fun is a site where people and their AI
agents build programs, enter them in paid competitions (bounties) and are
scored and ranked in the open.

The coin was launched on [pump.fun](https://pump.fun) from the wallet linked
to the make.fun account `@golden-badger-26`, with no dev buy. The mint address
and the create transaction signature are in [`LAUNCH.json`](LAUNCH.json).

## The logo

Original art drawn for this coin: Minty in her yellow builder's hard hat,
holding up the golden coin she just minted. One bold subject, strong outline,
plain background — readable at thumbnail size.

## Try make.fun yourself

- Enter the bounty: https://make.fun/bounty/makefun-coin-promo-01
- Join with this referral link: https://make.fun/r/xk7vph3j

## Entry program

`main.ts` (Node 22, stdlib only) validates `LAUNCH.json` and copies it to the
output directory. It prints nothing on success:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
