# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.19](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.18...v0.1.19) (2020-04-13)


### Features

* add targetName options in client ([4753e22](https://github.com/jlguenego/node-expose-sspi/commit/4753e22d01757b6434a2398018fd95f35d043bb3))
* added interface SecuritySupportProvider ([e0aec90](https://github.com/jlguenego/node-expose-sspi/commit/e0aec904ca257f0fc29ac4ad78f922cab882b24f))
* can force the client to use Kerberos ([c1cb932](https://github.com/jlguenego/node-expose-sspi/commit/c1cb9325d4e7de79f3235072a220501366cb5dfd))
* test stack trace are in ts ([e5fb53c](https://github.com/jlguenego/node-expose-sspi/commit/e5fb53c8a4ab8d4d68534d07fb5c38a3a430475c))


### Bug Fixes

* bad error management in auth.ts ([198b68d](https://github.com/jlguenego/node-expose-sspi/commit/198b68d70a8a1a033b2e6ae20843efc7de5cc153))
* kerberos or ntlm method deduction ([631c947](https://github.com/jlguenego/node-expose-sspi/commit/631c9475e16ec3b47cee6b49ee235c11de92b963))

### [0.1.18](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.17...v0.1.18) (2020-04-12)


### Bug Fixes

* get SPN must use the same algo as IE ([15dc162](https://github.com/jlguenego/node-expose-sspi/commit/15dc16292a99aeb06af3f3a353bb0d0d926ed48f))
* localhost SPN ([e84682d](https://github.com/jlguenego/node-expose-sspi/commit/e84682d437589e420eec9470370a3d9a82364937))

### [0.1.17](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.16...v0.1.17) (2020-04-10)


### Features

* add client runas ([bf05625](https://github.com/jlguenego/node-expose-sspi/commit/bf05625f2601ccaf36eb60580387fd977ecd6d18))

### [0.1.16](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.15...v0.1.16) (2020-04-10)


### Bug Fixes

* manage targetName utf16 ([df50c3e](https://github.com/jlguenego/node-expose-sspi/commit/df50c3ee9580e8e357341b6b2be5ae5f40280020))
* reorganize target for watching dev ([6b06644](https://github.com/jlguenego/node-expose-sspi/commit/6b06644aac86f663f7f6511e81bcfba720c880cf))
* use targetName as SPN (Issue [#6](https://github.com/jlguenego/node-expose-sspi/issues/6)) ([b3b1695](https://github.com/jlguenego/node-expose-sspi/commit/b3b169540a659858e25babf0f7db022128db7765))

### [0.1.15](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.14...v0.1.15) (2020-04-10)


### Features

* added more debug in client ([3d03834](https://github.com/jlguenego/node-expose-sspi/commit/3d03834fbdf89afdf509003451e3e37d6a7e86cb))


### Bug Fixes

* client cookie empty use case ([4917af9](https://github.com/jlguenego/node-expose-sspi/commit/4917af983823f0b64df08b2cc4dc437283cd0851))
* Issue [#5](https://github.com/jlguenego/node-expose-sspi/issues/5) about client documentation ([ba18985](https://github.com/jlguenego/node-expose-sspi/commit/ba18985cdfe6207dec967b7132e2983d7bc9b048))

### [0.1.14](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.13...v0.1.14) (2020-04-08)


### Features

* refactor mocha in ts ([4446b64](https://github.com/jlguenego/node-expose-sspi/commit/4446b64a0749d062ce9b875c3d5374dbbe13bf78))


### Bug Fixes

* no promise in middleware. ([af3688a](https://github.com/jlguenego/node-expose-sspi/commit/af3688aa2fc02439c655483173513a2f1a99bbff))

### [0.1.13](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.12...v0.1.13) (2020-04-07)


### Bug Fixes

* issue [#4](https://github.com/jlguenego/node-expose-sspi/issues/4) UX about AuthOptions. ([502a4fd](https://github.com/jlguenego/node-expose-sspi/commit/502a4fd3cd0a91432c1216da7d8d4392aa268782))

### [0.1.12](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.11...v0.1.12) (2020-04-07)


### Bug Fixes

* NextFunction can be also async ([5d6005c](https://github.com/jlguenego/node-expose-sspi/commit/5d6005c40e78287eef0f79244d47b81d9ab6a4df))

### [0.1.11](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.10...v0.1.11) (2020-04-07)


### Bug Fixes

* typescript asyncmiddleware ([cd11640](https://github.com/jlguenego/node-expose-sspi/commit/cd116404f4f9cbc1c3a48c13610fd8dfc7ea42e6))

### [0.1.10](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.9...v0.1.10) (2020-04-07)


### Features

* migration tslint to eslint ([c7a08da](https://github.com/jlguenego/node-expose-sspi/commit/c7a08da0d242338d9fd9b5a52fe8abdd6048140b))

### [0.1.9](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.8...v0.1.9) (2020-04-05)


### Features

* added mutex ([93f4c6d](https://github.com/jlguenego/node-expose-sspi/commit/93f4c6d78202c507b9d3ff5b6ea8cbbf85b95109))

### [0.1.8](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.7...v0.1.8) (2020-04-04)


### Features

* add cookie management to auth and client ([1e8e8de](https://github.com/jlguenego/node-expose-sspi/commit/1e8e8debcee40aae508ad0315701be204425ff39))


### Bug Fixes

* c++ code does not rely on atlstr.h anymore ([b8d0c90](https://github.com/jlguenego/node-expose-sspi/commit/b8d0c90e596f7000eafac3ca56c75e328e600965))
* small check of release method ([c242a77](https://github.com/jlguenego/node-expose-sspi/commit/c242a771cfcdd996ede27ec63225b80cb89e791d))
* tooLate and this.authItem ([9c63c97](https://github.com/jlguenego/node-expose-sspi/commit/9c63c9719ae249b82b2f82c796ef3d75f797f861))

### [0.1.7](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.6...v0.1.7) (2020-04-02)


### Bug Fixes

* replaced autorization with Authorization ([9615182](https://github.com/jlguenego/node-expose-sspi/commit/9615182fa3a6b77cdd6c464218186ace945b0ebf))

### [0.1.6](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.5...v0.1.6) (2020-04-02)


### Bug Fixes

* can support many request in parallel ([4e8c359](https://github.com/jlguenego/node-expose-sspi/commit/4e8c3596b4517f0c677184a811f0e8dfed69242c))

### [0.1.5](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.4...v0.1.5) (2020-04-02)


### Features

* async error stack trace ([245ea15](https://github.com/jlguenego/node-expose-sspi/commit/245ea156d13fcfdc025393584d1b0cda8212d57b))


### Bug Fixes

* case where authIsReady called too late ([a4ac4c6](https://github.com/jlguenego/node-expose-sspi/commit/a4ac4c6ac82ca189d24dad6fe2c4656edab7ba51))
* Issue [#2](https://github.com/jlguenego/node-expose-sspi/issues/2) - crash server ([7b16afe](https://github.com/jlguenego/node-expose-sspi/commit/7b16afe977663e4b7116458841071e55bef436f5))
* refactor getUser with try catch ([4f8a3b7](https://github.com/jlguenego/node-expose-sspi/commit/4f8a3b748cc9ab9094dbf1824cb5b6d901b0ca1a))

### [0.1.4](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.3...v0.1.4) (2020-04-01)


### Features

* add authIsReady function ([34086d0](https://github.com/jlguenego/node-expose-sspi/commit/34086d02da9d47b5ecc7be734e0683175671f32b))
* add fastify example ([54bdef2](https://github.com/jlguenego/node-expose-sspi/commit/54bdef2ab6ee81cbf09f81e20833244c91e5a883))
* add sleep promise ([f62942b](https://github.com/jlguenego/node-expose-sspi/commit/f62942bde9e9e31795705f123648172ed8a38008))
* added options for authentication ([f911e7f](https://github.com/jlguenego/node-expose-sspi/commit/f911e7f572ec8d944e834b5f96bd6747ae084790))
* added restify example ([dc6c57b](https://github.com/jlguenego/node-expose-sspi/commit/dc6c57bbaa3529ecb4e670bb9dda6f279b75c381))


### Bug Fixes

* connect local account on domain ([e94dbe5](https://github.com/jlguenego/node-expose-sspi/commit/e94dbe58c60e0fd5f5c9b55dc6924fcf64c188fe))
* improving test ([18f0795](https://github.com/jlguenego/node-expose-sspi/commit/18f0795377cf3cf3c9d88c7fb9f94d4e443a7064))

### [0.1.3](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.2...v0.1.3) (2020-03-28)


### Features

* added isActiveDirectoryReachable ([c9be60b](https://github.com/jlguenego/node-expose-sspi/commit/c9be60b49c091e2afad9035edee3e3fdadb70b10))
* make middleware koa compliant ([3036a3a](https://github.com/jlguenego/node-expose-sspi/commit/3036a3ae011979a6d38f609ccb540c44de01facf))
* use npm module debug ([78a4770](https://github.com/jlguenego/node-expose-sspi/commit/78a4770c0e8c4ecfa638ecf99f7178092a49a50c))


### Bug Fixes

* stress test use case ([4dd1984](https://github.com/jlguenego/node-expose-sspi/commit/4dd1984773d7e85354f1df5e0e8709566ccef278))

### [0.1.2](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.1...v0.1.2) (2020-03-27)


### Bug Fixes

* error HTTP 431 - header too large ([bfd7b54](https://github.com/jlguenego/node-expose-sspi/commit/bfd7b54242da8a9e8b963ddbd9d915aa54db56e9))
* examples debugged ([d920de0](https://github.com/jlguenego/node-expose-sspi/commit/d920de09698ac699dae6f673bad48623c65a5a93))
* remove serverContextHandle ([496b732](https://github.com/jlguenego/node-expose-sspi/commit/496b732148ad43edb0288f2c8469ef84a4700177))
* update api in examples ([0f841e7](https://github.com/jlguenego/node-expose-sspi/commit/0f841e7f912c62ab6de7e4a6bdcf1dfa46993f64))

### [0.1.1](https://github.com/jlguenego/node-expose-sspi/compare/v0.1.0...v0.1.1) (2020-03-26)


### Bug Fixes

* export all interfaces ([9fa59d7](https://github.com/jlguenego/node-expose-sspi/commit/9fa59d7d6745849805b45610297fe5abf3269987))

## [0.1.0](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.21...v0.1.0) (2020-03-26)


### Features

* add lint in package.json target ([aa07886](https://github.com/jlguenego/node-expose-sspi/commit/aa078862562dfd1a93a4ff7110f00c4c9ccf6dfc))
* add proxy test ([e6f6e07](https://github.com/jlguenego/node-expose-sspi/commit/e6f6e074c5897348e83ab5c07c83f4ee324491d8))
* added ActiveDirectory functions ([2ccecc7](https://github.com/jlguenego/node-expose-sspi/commit/2ccecc733792c2006b69394a38654f1c89bb168a))
* added CoInitialize api ([c510211](https://github.com/jlguenego/node-expose-sspi/commit/c5102114fdc61d02b4c722d1bb2ef1528a1f2f12))
* added CoUninitialize ([26db537](https://github.com/jlguenego/node-expose-sspi/commit/26db5377e4e2f81595a367ba855f26b2dc27c367))
* added init directly in auth ([fa69220](https://github.com/jlguenego/node-expose-sspi/commit/fa692206e32f6a42186a32ce5f8407102fcdc3bb))
* added isOnDomain ([002a3de](https://github.com/jlguenego/node-expose-sspi/commit/002a3dec488ad4da5bc7037766c10449393c4810))
* added mocha ([8a4a895](https://github.com/jlguenego/node-expose-sspi/commit/8a4a895df414a9dca18aa3fedc1cb9f3ff92810c))
* expose GetComputerNameEx ([a587422](https://github.com/jlguenego/node-expose-sspi/commit/a5874221e3101ffe446879a527deb9b85eba7078))


### Bug Fixes

* add prettierrc ([5096255](https://github.com/jlguenego/node-expose-sspi/commit/5096255288cb3917b823c0cef1518de9f6b60134))
* compatibility VC++2017 remove constant ([ef8010c](https://github.com/jlguenego/node-expose-sspi/commit/ef8010c1ea2cce27fe7561ec688c83ee13452cd6))
* no need test doc .vscode in npm module. ([f700dfa](https://github.com/jlguenego/node-expose-sspi/commit/f700dfac96bc315a46b1e1c4eeafa68376e68468))

### [0.0.21](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.20...v0.0.21) (2020-03-18)


### Features

* adding client in sso object ([931ea07](https://github.com/jlguenego/node-expose-sspi/commit/931ea0786b17e09f915d25630ef72ea77a829d1f))

### [0.0.20](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.19...v0.0.20) (2020-02-29)


### Features

* use require-self ([5899627](https://github.com/jlguenego/node-expose-sspi/commit/5899627e4d8b16db30b0808df7af234d8227d0ae))

### [0.0.19](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.18...v0.0.19) (2020-02-27)


### Features

* added more doc on sspi ([3523e90](https://github.com/jlguenego/node-expose-sspi/commit/3523e90be906d07291f8d92d700e089db612bab6))

### [0.0.18](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.17...v0.0.18) (2020-02-23)


### Features

* added require-self utility ([5946bcd](https://github.com/jlguenego/node-expose-sspi/commit/5946bcdbd68e214fc816ce2ecc33a79e09ca8959))


### Bug Fixes

* added tslint ([e52cd80](https://github.com/jlguenego/node-expose-sspi/commit/e52cd80d756e8a2d4efe50215f7b23ae55519c52))

### [0.0.17](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.16...v0.0.17) (2020-02-23)


### Features

* adding typedoc documentation ([1329844](https://github.com/jlguenego/node-expose-sspi/commit/1329844ba3e47b29f170bc586dbaa607eaddc1c3))

### [0.0.16](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.15...v0.0.16) (2020-02-21)


### Bug Fixes

* req.sso not recognized in ts ([b6088f3](https://github.com/jlguenego/node-expose-sspi/commit/b6088f3c9cde5afcc9bc6ffc32aab6892a2b9ac7))

### [0.0.15](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.14...v0.0.15) (2020-02-21)


### Features

* added method to sso ([1e6abc9](https://github.com/jlguenego/node-expose-sspi/commit/1e6abc9fa3f632e374950a81dd8cc8c27bfa6579))


### Bug Fixes

* moving some types to interfaces ([5c098f9](https://github.com/jlguenego/node-expose-sspi/commit/5c098f9bd53aa7c3a43181de4a1fd6ef7fd16cb1))
* no console.log in api ([944d0ed](https://github.com/jlguenego/node-expose-sspi/commit/944d0ed9e42b70e1556c9e493e84e38fe276bc04))

### [0.0.14](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.13...v0.0.14) (2020-02-17)


### Bug Fixes

* credentials renew ([c83e1ea](https://github.com/jlguenego/node-expose-sspi/commit/c83e1ea35122335d4fdec6aef37b2974f484f1c3))
* doc kerberos separated ([d1f8709](https://github.com/jlguenego/node-expose-sspi/commit/d1f87097654bf420e44532a5dbd00da9217264ae))
* no more global variable ([18349f6](https://github.com/jlguenego/node-expose-sspi/commit/18349f6920b6aa366ad0c322c21ee47467c85bfa))
* typings in auth.ts ([691e65d](https://github.com/jlguenego/node-expose-sspi/commit/691e65deedc81da2d50acc241efef7ea217a515f))

### [0.0.13](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.12...v0.0.13) (2020-02-16)


### Bug Fixes

* better error handling ([6503f6f](https://github.com/jlguenego/node-expose-sspi/commit/6503f6fd33e636399443db0da34d5fd6475c426f))

### [0.0.12](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.11...v0.0.12) (2020-02-16)


### Features

* add access token flags in ts ([3204732](https://github.com/jlguenego/node-expose-sspi/commit/3204732c649cd1465b39ffacfc44aa4431c9c2e3))
* added extended name format flag ([2d532cd](https://github.com/jlguenego/node-expose-sspi/commit/2d532cd1db37b112919278a91be1251da99812f9))
* added flag to acceptSecurityContext ([9fc1160](https://github.com/jlguenego/node-expose-sspi/commit/9fc1160dee20294a8dc01fad9cac68c45d738567))
* added flags for targetDataRep ([2b4bc92](https://github.com/jlguenego/node-expose-sspi/commit/2b4bc92c0c834411d5f8bc720b7737e6bce4df3f))
* added IscReqFlag ([9e9aba4](https://github.com/jlguenego/node-expose-sspi/commit/9e9aba41ef069a800219c13c02e40007e31fbbd9))
* added secStatus error msg ([245fb45](https://github.com/jlguenego/node-expose-sspi/commit/245fb451fc5355c534993f35a16c95e6e9071895))


### Bug Fixes

* added flags for credentialUse ([9c4e6f2](https://github.com/jlguenego/node-expose-sspi/commit/9c4e6f21a1e4842864b462cb727d1aede5f284ab))
* added setFlags utility to return flags ([775e90c](https://github.com/jlguenego/node-expose-sspi/commit/775e90caef292b5be07eaa8eef059863bb1c4ba5))
* added targetDataRep for ISC ([d7ee57f](https://github.com/jlguenego/node-expose-sspi/commit/d7ee57fd0aa4a851a7675e2c38958a0b928000b2))
* added typings on auth() ([18f0379](https://github.com/jlguenego/node-expose-sspi/commit/18f03793f54dbe5ca0231871ffa105c657f657ee))
* int64_t flags ([b918ca5](https://github.com/jlguenego/node-expose-sspi/commit/b918ca52b50d1b0675699a283de4990b96cc76bc))

### [0.0.11](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.10...v0.0.11) (2020-02-16)


### Bug Fixes

* refactor library in ts ([a8d7c5d](https://github.com/jlguenego/node-expose-sspi/commit/a8d7c5d602ad674cd5e898f3fc0577e7f2f742d4))

### [0.0.10](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.9...v0.0.10) (2020-02-14)


### Bug Fixes

* default undefined displayName to name ([b6a69d4](https://github.com/jlguenego/node-expose-sspi/commit/b6a69d4df8486ec24ad7865e620c13d8240ad1eb))

### [0.0.9](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.8...v0.0.9) (2020-02-13)


### Features

* add default domain fn ([b919405](https://github.com/jlguenego/node-expose-sspi/commit/b9194054f6adce36d1629a1b5e8c852d005e9371))
* added sspi.connect() ([84c07d1](https://github.com/jlguenego/node-expose-sspi/commit/84c07d1701455543684ff8e0452d17472fe3f367))


### Bug Fixes

* add createSSO function ([c2c7e64](https://github.com/jlguenego/node-expose-sspi/commit/c2c7e64884eb4c23bd53292a5ce35e6876e316b1))
* adding typescript interfaces ([bc649b2](https://github.com/jlguenego/node-expose-sspi/commit/bc649b2e8e17b3be607085578ad260c26019dc2b))
* displayName optionals ([52431cd](https://github.com/jlguenego/node-expose-sspi/commit/52431cd38069978e2816a66e8bd222ccf3494482))
* example done with session ([2665566](https://github.com/jlguenego/node-expose-sspi/commit/266556628ff407134e9ef247baa18c8c354b7535))
* managing a bad login/password error ([c2b9207](https://github.com/jlguenego/node-expose-sspi/commit/c2b9207f8352124e1a9193eafd6557da6a788cfc))
* refactor code for smaller file ([ad5e282](https://github.com/jlguenego/node-expose-sspi/commit/ad5e2828fdc1700690e6e8a81442f34051cc7a5a))
* server error management ([8bdf16b](https://github.com/jlguenego/node-expose-sspi/commit/8bdf16b342f08240b6ba4b3b12d007adc423fd04))
* splitted code into smaller file ([c0f041d](https://github.com/jlguenego/node-expose-sspi/commit/c0f041dced4604630494100395cf0b3fbc7299b9))

### [0.0.8](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.7...v0.0.8) (2020-02-12)


### Features

* add flags support ([1469b86](https://github.com/jlguenego/node-expose-sspi/commit/1469b86af858058ec02538726d885f1bcd0139aa))
* added NameSamCompatible for GetUserNameEx ([4e9e6f2](https://github.com/jlguenego/node-expose-sspi/commit/4e9e6f26a20e204195cfa3a83049692378554f54))


### Bug Fixes

* added proper error message ([7b19fb2](https://github.com/jlguenego/node-expose-sspi/commit/7b19fb21bd0e91df962017a467ede58da2d20a68))

### [0.0.7](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.6...v0.0.7) (2020-02-12)


### Features

* added GetUserNameEx ([b230721](https://github.com/jlguenego/node-expose-sspi/commit/b2307213e74c93c31f16228e95cf4edb4774fbe0))


### Bug Fixes

* add display name to sso middleware ([0209538](https://github.com/jlguenego/node-expose-sspi/commit/0209538dd30e38c0ff062f63dd56a975c3212284))
* added npmignore ([bd0d4c2](https://github.com/jlguenego/node-expose-sspi/commit/bd0d4c2f69538a3fda98dd224d8ab18e7e50307b))
* reduce footprint in the request ([cce52bd](https://github.com/jlguenego/node-expose-sspi/commit/cce52bdc67a973c1ee99c15149198fd80bfc1a0d))
* remove sspi.node from git management ([87d5849](https://github.com/jlguenego/node-expose-sspi/commit/87d58493004fbdc28c16c00f4e19dd8f15342ce3))
* typescript footprint sso ([2cc2b06](https://github.com/jlguenego/node-expose-sspi/commit/2cc2b064f4eb2f9fe78e197713db4ba3565d5994))

### [0.0.6](https://github.com/jlguenego/node-expose-sspi/compare/v0.0.5...v0.0.6) (2020-02-12)


### Bug Fixes

* install standard-version ([5cb6e0c](https://github.com/jlguenego/node-expose-sspi/commit/5cb6e0cd10da6e2fff1cf690fb679273875c9091))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
