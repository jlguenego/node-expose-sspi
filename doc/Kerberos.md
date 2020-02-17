# Setting up a Kerberos scenario

If you want to do a SSO authentication using Kerberos, you must be on a Microsoft Windows Domain.
So first make sure your computer is part of a domain.
The browser and the server must be on different machines. If not, the NTLM protocol will be used.
I did not find why there is this restriction.


To make a full working example on a laptop (for demo), 
you could run :
- one VM with a Microsft Windows Server 2016 (hostname: JLGDC01),
- two VM with Microsoft Windows 10 (hostname: fifi and spooky).

You may see for instance [this tutorial for details about how to set up a domain](https://www.tenforums.com/tutorials/51456-windows-server-2016-setup-local-domain-controller.html).



On Microsft Windows Server 2016, make a Active Directory Domain Controller (AD DC).
Call it for instance jlg.local (NETBIOS: JLG)

Declare two real domain users on AD DC:
- login: jlouis
- login: suzana

The webserver will be run with another account. Create it as well:

- login: spookyweb
- login NETBIOS : JLG\SPOOKYWEB
- password (example): Toto123!
- Password must not expire.

Set two Service Principal Names (SPN) on this wpookyweb account:
```
setspn -a HTTP/spooky.jlg.local JLG\SPOOKYWEB
setspn -a HTTP/spooky JLG\SPOOKYWEB
```

Start the server on `spooky` host with the user JLG\SPOOKYWEB.
```
runas /user:JLG\SPOOKYWS cmd
password: Toto123!

cd <myproject>
node server.js
```

Go on the `fifi` host. Log as `jlouis`.
Make sure the browser is configured. For Chrome, you need to add
the website domain name to the advanced list of local intranet sites.

For that, open

`Control Panel > Network and Internet > Internet options`.

Then go on 

`Security > Local Intranet > Sites > Advanced`


Add two websites to the list:
- spooky
- spooky.jlg.local

No need to specify any port.

Then go on your `fifi` Chrome, and run `http://spooky:3000` or `http://spooky.jlg.local:3000`

The SSO authentication should be in Kerberos. If you set in the `server.js` file

```
global.debug = true;
```
You should see the token exchanged and the protocol name used (Kerberos).

## Author

Jean-Louis GUENEGO <jlguenego@gmail.com> (http://jlg-consulting.com/)
