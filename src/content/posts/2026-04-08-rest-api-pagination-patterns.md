---
title: "REST API pagination patterns"
date: 2026-04-08
category: "REST API"
excerpt: "When you're paging through a large result set from /api/now/table, the offset parameter looks straightforward — until you hit performance walls."
---

When you're paging through a large result set from `/api/now/table`, the offset parameter looks straightforward. Set `sysparm_offset=10000`, get records 10,001 through 10,100, done. Until you hit a wall around the 10,000 mark and queries start timing out, or worse, silently return inconsistent data when records are being inserted while you read.

There are three patterns worth knowing. Offset-based pagination is the default and the simplest, but the database has to scan and discard every record before the offset, so performance degrades linearly. Cursor-based pagination using `sysparm_query` with a `sys_id>` filter is dramatically faster at scale because the database can use the sys_id index directly — your "next page" query is just `sys_idLAST_SYS_ID_YOU_SAW`. The third pattern, `sysparm_first_row` and `sysparm_last_row`, is ServiceNow-specific and useful for fixed windows but has the same scan-and-discard problem as offset.

The gotcha nobody mentions: offset-based pagination silently misses records when the underlying data changes mid-query. If a new incident is inserted while you're on page 5, your page 6 will skip a record. For anything where completeness matters — exports, backups, sync jobs — use cursor-based.
