---
title: "Scripted REST resources are underused"
date: 2026-04-05
category: "REST API"
excerpt: "If you're building anything beyond basic CRUD, scripted REST is where the actual power lives — and it's simpler than people think."
---

If you're building anything beyond basic CRUD, scripted REST resources are where the actual power lives. The auto-generated table API is fine for "give me all incidents where state=2," but the moment you need to combine data from three tables, transform the response, or enforce business logic that ACLs can't express, scripted REST is the right tool. And it's simpler than people think — a resource is essentially a function that receives a request object and returns a response object.

The structural tip I wish I'd known earlier: organize resources by logical operation, not by HTTP verb. Don't create one POST resource and one GET resource on the same endpoint and stuff different behaviors into each. Create separate resources with explicit names — `/api/x_company/order/submit`, `/api/x_company/order/cancel`, `/api/x_company/order/status`. Easier to read, easier to test, easier to secure.

The security note that nobody emphasizes enough: always check the user's role inside the script, even if the ACL on the resource looks tight. ACLs run before the script, but if you ever change the resource's ACL or expose it to a different user group, the in-script role check is your defense in depth. Two locks are cheap. Getting breached is expensive.
