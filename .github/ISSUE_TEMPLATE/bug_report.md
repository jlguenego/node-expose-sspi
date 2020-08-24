---
name: Bug report
about: Create a report to help us improve
title: ''
labels: ''
assignees: ''

---

WARNING: [PLEASE READ THE DOC FOR DEBUGGING YOURSELF](https://github.com/jlguenego/node-expose-sspi/blob/master/doc/use-case/errors.md).


**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**

Please provide the **minimum of code** to reproduce the issue.
You can provide the code directly in the issue, or through a github project that you make for proving the defect.

Indicate the step to reproduce if necessary, like:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Trace**
Do not hesitate to setup env variable `DEBUG=node-expose-sspi:*`.
Then run your project and provide the trace to get a maximum of info.

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment version:**
 - OS: [e.g. iOS]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

Please indicates also:
 - Are you on a Windows domain ? yes/no
 - Can you reach the domain controller ? yes/no
 - Do your session have admin privileges ? yes/no
 - Which authentication protocol ? Kerberos, or NTLM, or Unknown.
 - Active Directory, or local window policies that could impact the authentication.

**Additional context**
Add any other context about the problem here.
