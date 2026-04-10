---
title: "The sys_id you didn't know existed"
date: 2026-04-06
category: "Platform"
excerpt: "Every record in ServiceNow has one. Most people treat it as opaque. There's structure inside if you know where to look."
---

Every record in ServiceNow has a `sys_id`. Most developers treat it as an opaque 32-character string — copy it, paste it, never look inside. But it's actually a UUID: 16 bytes of randomness rendered as hex. That has practical consequences worth knowing.

The first: two sys_ids generated on different ServiceNow nodes within the same millisecond are guaranteed to be unique. This is a stronger guarantee than auto-incrementing IDs in a legacy SQL database, where two nodes can race for the same next-id and conflict. ServiceNow can scale horizontally without ever coordinating ID generation, and that's why.

The second: because they're random and not sequential, you cannot infer anything about creation order from sys_ids. If you need to know which of two records was created first, use `sys_created_on`, never the sys_id. People assume sys_ids increase over time and write code that breaks subtly when records arrive out of order. Don't be that person.
