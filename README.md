# poe-mod-descriptions
This module provides descriptions for mods

## Usage
```
import * as poe from 'poe-mod-descriptions';
var mods = [mod1, mod2, mod3];
poe.getDescriptions(mods);

Returns an object containing the text string of the stats and a 
boolean indicating whether it is a master craft
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
      "key": ...
      ...
    },
    "stat2": {
      ...
    }
  ]
}
```