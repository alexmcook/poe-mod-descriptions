# poe-mod-descriptions
This module provides descriptions for mods

## Usage
```
import { getDescriptions } from 'poe-mod-descriptions';
var mods = [mod1, mod2, mod3];
getDescriptions(mods);
```

### Requirements
The data must be of this structure
```
"mod" : {
  ...
  ...
  ...
  "stats": [
    "stat1": {
      "id": ...
      "value": ...
      ...
    },
    "stat2": {
      ...
    }
  ]
}
```