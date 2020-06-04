## Introduction

This node module was originally created to expose the Microsoft SSPI API ([Security Support Provider Interface](https://docs.microsoft.com/en-us/windows/win32/secauthn/sspi)). This API is useful for Kerberos and NTLM authentication. Both theses authentications methods allow a Windows user account to automatically gives its credentials to a website without to fulfill a login/password form, which saves time for instance when a user has to use an internal company website. This is called [SSO](https://en.wikipedia.org/wiki/Single_sign-on).

In the SSO scenario, the website may wish to access to an [Active Directory Domain Controller](https://en.wikipedia.org/wiki/Domain_controller_(Windows)) to get more info about the logged user. Therefore, this module also exposes some part of the [Microsoft Active Directory Service Interface (ADSI)](https://docs.microsoft.com/en-us/windows/win32/adsi/active-directory-service-interfaces-adsi).

This library thus exposes a maximum of [SSPI C/C++ functions](./api/modules/_lib_sspi_d_.md) and also some [ADSI C/C++ functions](./api/modules/_lib_adsi_d_.md) to the NodeJS world.

It also exposes some C/C++ miscellaneous other functions that may be useful for getting some info about the system. It is called [sysinfo](./api/modules/_lib_sysinfo_d_.md).

The remaining part of the module is a set of javascript exported objects (classes, functions, etc.), written in Typescript, all wrapped in the [`sso`]() object. The purpose of them is to give to the developers some utilities to help achieve some basic SSPI use cases (both server and client with negotiate protocol).

## C/C++ part

C/C++ part:

- [adsi](./api/modules/_lib_adsi_d_.md)
- [sspi](./api/modules/_lib_sspi_d_.md)
- [sysinfo](./api/modules/_lib_sysinfo_d_.md)

## Javascript part:

All the javascript part is in fact written in Typescript.

- Server:
  - [The middleware `sso.auth(options?)`](./modules/_src_sso_auth_.md), which can be used with most of the webserver node frameworks (express, fastify, restify, connect, etc.)
- Client:
  - [the fetch client](./classes/_src_sso_client_.client.md) `const response = await new sso.Client().fetch(url);`, which can be used to query a webserver that uses the Negotiate with Kerberos/NTLM protocols. HTTP cookies are automatically managed.

## Author 

Jean-Louis GUENEGO <jlguenego@gmail.com>
