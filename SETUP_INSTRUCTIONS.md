# Emmy Contest Setup Instructions

## Your Current Google Sheet Structure ✅

Perfect! I can see you already have the right structure:

### "Staci" Tab Format:
- **Column A**: Category names and nominees (vertical list)
- **Column B**: Where Staci enters her picks (✓ or nominee name)  
- **Column C**: Where you'll add actual winners

## What You Need To Do:

### 1. Add More Judge Tabs
- **Duplicate the "Staci" tab** for each judge
- **Rename each tab** with the judge's name (e.g., "Mike", "Sarah", "John")
- **Keep the same structure** - nominees in Column A, picks in Column B

### 2. Create Winners Reference
**Option A: Add Winners Column**
- In each judge tab, use **Column C for actual winners**
- Add winners as they're announced during ceremony

**Option B: Create Winners Sheet** (recommended)
- Create a new tab called "Winners"
- Set it up like this:
```
Category                                    | Winner
Outstanding Drama Series                    | Slow Horses
Outstanding Lead Actress in a Drama Series  | Keri Russell, "The Diplomat"
Outstanding Lead Actor in a Drama Series    | Gary Oldman, "Slow Horses"
etc...
```

### 3. How Judges Enter Picks
In Column B next to their choice, judges enter:
- **✓** (checkmark) next to their pick, OR
- **Copy the exact nominee text** they're picking

Example:
```
Outstanding Drama Series                    |
"The Diplomat"                             | ✓
"The Gilded Age"                          |
"Slow Horses"                             |
```

## Technical Setup ✅

The website code is already updated to work with your vertical format:
- **Sheet ID**: Already configured (1TUbgqecRxGAJT8ckPPq7PsbmVMpvlFa4LPGqVdh-wuU)
- **Format**: Reads your vertical list structure
- **Auto-refresh**: Updates every 30 seconds

## To Test Right Now:

1. **Add a few picks** in Staci's Column B (✓ next to some nominees)
2. **Open results.html** in a browser
3. **Should show Staci with her current score**

## Adding More Judges:

1. **Right-click the "Staci" tab**
2. **Select "Duplicate"** 
3. **Rename to judge's name**
4. **Update the JavaScript** to include new judge names:

In `results.js`, change this line:
```javascript
const judgeSheets = ['Staci']; // Add more judge names as needed
```

To:
```javascript
const judgeSheets = ['Staci', 'Mike', 'Sarah', 'John']; // Your judge names
```

## That's It!

Your format is perfect - much cleaner than my original horizontal approach. The vertical list is easier to read and fill out on mobile devices during the ceremony.

**Ready to add more judges and test?**