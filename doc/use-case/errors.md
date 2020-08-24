# Use case

Run the [javascript simple server](../../examples/express-simple).

## NTLM popup on 127.0.0.1

From Chrome, open `http://localhost:3000`. You see the SSO working with your Windows account with NTLM.

From Chrome, open `http://127.0.0.1:3000`. A popup comes up. 
- If you fill some Windows correct credentials, it will works.
- But if you fill wrong Windows correct credentials it should not go to error but return the **local guest account**.
- And if you fill with empty credentials, it should not go to error but return the **anonymous logon account**.

**Note:** You must remove your Browser cache to remove the credentials and see again the popup dialog coming.

## aliases on C:\Windows\System32\drivers\etc\host

It behaves like if the alias was called. For instance, if you have in the `host` file:
```
127.0.0.1 toto.titi.com
```

Calling from an HTTP client `http://toto.titi.com:3000` will do exactly as if you were calling `http://127.0.0.1:3000`.

## Kerberos on localhost from sso.Client

Kerberos on localhost cannot be done from a traditional browser (Chrome, Edge, Firefox, etc.).

But the `new sso.Client()` can do Kerberos on localhost by forcing the target name with `setTargetName(name: string)`.



## Author

Jean-Louis GUENEGO <jlguenego@gmail.com>
