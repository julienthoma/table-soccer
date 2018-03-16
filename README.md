## React Table Soccer

## copy config.dist.json to config.json



### firebase db rules
```
{
  "rules": {
    "data": {
      ".read": true,
      "games": {
      ".write": true
      },
      "players": {
        ".write": true
      }
    }
  }
}
```
