curl "https://YOUR_INSTANCE.service-now.com/api/now/account?sysparm_limit=5&sysparm_query=customer=true" \
  --request GET \
  --header "Accept:application/json" \
  --user 'admin':'password'
