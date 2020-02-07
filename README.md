# node-expose-sspi

Allow to use the Microsoft Windows SSPI (SSP Interface) for doing authentication stuff directly in Node.

## Install

```
npm i node-expose-sspi
```

## Usage

```
```

## Kerberos

You must be on a domain (ex: jlg.local).
Note the NETBIOS domain name : JLG

The HTTP server must be on a machine belonging on the domain (ex: spooky.jlg.local).

To setup Kerberos, you go on the AD DS and create a user.
login: HTTP/spooky.jlg.local
login ols windows : JLG\SPOOKYWS
password: Toto123!
The password never expires and do not need to be changed.

Then, create the SPN from the machine on the domain where the server will be (spooky):
```
setspn -a HTTP/spooky.jlg.local@jlg.local JLG\SPOOKYWS
setspn -a HTTP/spooky@jlg.local JLG\SPOOKYWS
```

The HTTP Server must be run as the Windows user (JLG\SPOOKYWS) :
```
runas /user:JLG\SPOOKYWS cmd
password: Toto123!

npm run server
```

## TODO

- Typescript
- user structure


## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
