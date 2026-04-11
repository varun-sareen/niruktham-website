---
title: "Account API — read-only, CSM-only, and the default limit is not what you think"
date: 2026-04-11
category: "REST API"
excerpt: "The Account API looks like a stripped-down Table API for CSM accounts. It is. But the defaults are different, the error messages are wrong, and the plugin dependency trips up more teams than it should."
---

REST API Series · Post 1

The Account API is a stripped-down Table API for CSM accounts. Different defaults, copy-pasted error messages, and a plugin dependency that trips up teams silently.

## What it does

`GET /api/now/account` — retrieves CSM account records from `customer_account` with pagination and query support. `GET /api/now/account/{id}` — retrieves one account by sys_id. Two read-only endpoints. No POST, PUT, or DELETE.

![Account API request flow](/post-images/account-api-request-flow.svg)

## Minimum viable example

```bash
curl "https://YOUR_INSTANCE.service-now.com/api/now/account\
?sysparm_limit=5\
&sysparm_query=customer=true" \
  --request GET \
  --header "Accept:application/json" \
  --user 'admin':'password'
```

Returns up to five customer accounts. The response includes a `hasMore` boolean — when `true`, increment `sysparm_offset` by `sysparm_limit` and repeat.

## Five gotchas

**Default limit is 10, not 100.** The Table API defaults `sysparm_limit` based on `glide.rest.max_result_count`. The Account API hardcodes the default to 10. Skip setting it explicitly and your integration silently returns partial data.

![Account API pagination loop](/post-images/account-api-pagination-loop.svg)

**Read-only.** No create, update, or delete. Need to write account records? Use the Table API against `customer_account` directly.

**The 404 says "case" not "account."** The docs for `GET /api/now/account/{id}` state the 404 means "Requested case doesn't exist." Copy-paste from the Case API. The endpoint works — the message is wrong.

**Both `customer` and `partner` default to `false`.** A new account with no flags set is neither customer nor partner. Filter logic that assumes one or the other will miss these records.

**No plugin, no endpoint.** Requires `com.sn_customerservice` and the `csm_ws_integration` role. Without CSM, the endpoint returns a 404 with no useful error. Verify the plugin is active before building against this API, especially across multi-instance setups.

## When to use it

Read-only CSM integrations — portals, dashboards, BI tools pulling account metadata. Cleaner response shape than raw Table API on `customer_account`.

## When not to use it

When you need writes, when CSM isn't installed, or when you need dot-walked fields from related tables in one call.

Next in the series: ActivitySubscriptions API — the notification system most teams don't know exists.

---

#ServiceNow #RESTAPI #Integration #ServiceNowDev #Niruktham

@ServiceNow @ServiceNow Community @SolvVision @ServiceNow Partners
