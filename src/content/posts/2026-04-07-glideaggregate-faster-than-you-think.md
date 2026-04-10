---
title: "Why GlideAggregate is faster than you think"
date: 2026-04-07
category: "GlideRecord"
excerpt: "Most ServiceNow developers reach for GlideRecord by reflex. For counts, sums, and group-bys, GlideAggregate is dramatically faster."
---

Most ServiceNow developers reach for `GlideRecord` by reflex. Loop through the records, increment a counter, return the total. It works. It's also doing the wrong thing — pulling every record from the database into JavaScript memory just to count them.

`GlideAggregate` pushes the aggregation to the database. Counting incidents by priority looks like this: instantiate a GlideAggregate on `incident`, add the aggregate `'COUNT'`, group by `priority`, query, then loop the results. You get back five rows (one per priority value) instead of fifty thousand incidents. The database does the heavy lifting where it's fastest, and your JavaScript only sees the summary.

The footgun that surprises everyone the first time: you have to call `.next()` before you can read aggregate values, even though it doesn't feel like a "next" — you're not iterating individual records, you're iterating groups. Forget the `.next()` and `getAggregate('COUNT')` returns null and you spend ten minutes wondering what's broken. Now you know.
