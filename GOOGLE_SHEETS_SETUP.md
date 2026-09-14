# Google Sheets Setup for Emmy Competition

## Sheet Structure

Create a Google Sheet with **2 tabs**:

### Tab 1: "Judges" 
This is where judges enter their picks.

**Column Structure:**
```
A: Judge       | B: Drama Series | C: Drama Actress | D: Drama Actor | E: Comedy Series | F: Comedy Actress | etc...
Judge Name 1   | The Diplomat    | Keri Russell     | Gary Oldman    | The Bear         | Ayo Edebiri       |
Judge Name 2   | Slow Horses     | Zendaya         | Noah Wyle      | Hacks            | Jean Smart        |
```

**All Categories (column headers):**
- Drama_Series
- Drama_Actress  
- Drama_Actor
- Drama_Supporting_Actress
- Drama_Supporting_Actor
- Comedy_Series
- Comedy_Actress
- Comedy_Actor
- Comedy_Supporting_Actress
- Comedy_Supporting_Actor
- Limited_Series
- Limited_Actress
- Limited_Actor
- Variety_Series

### Tab 2: "Winners"
This is where you enter the actual Emmy winners.

**Column Structure:**
```
A: Category              | B: Winner
Drama_Series            | Slow Horses
Drama_Actress           | Keri Russell
Drama_Actor             | Gary Oldman
Comedy_Series           | The Bear
Comedy_Actress          | Jean Smart
etc...
```

## Setup Steps:

1. **Create the Google Sheet** with the structure above
2. **Make it publicly viewable:**
   - Click Share → Change to "Anyone with the link can view"
3. **Copy the Sheet ID** from the URL:
   - URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
4. **Update results.js:**
   - Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID

## How It Works:

1. **Judges fill their picks** directly in the Google Sheet
2. **You enter winners** as they're announced in the Winners tab
3. **Website automatically calculates** percentage scores
4. **Results update** every 30 seconds or when refreshed

## Example Sheet ID Update:

In `results.js`, change this line:
```javascript
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
```

To something like:
```javascript
const SHEET_ID = '1KfYBtVnwkE4kbRSR1VpPrnjbkLjnax1qILeg_xHf8QQ';
```

Then just open `results.html` in a browser to see the live scoreboard!

## Mobile-Friendly Features:
- ✅ Responsive design
- ✅ Large touch targets  
- ✅ Auto-refresh every 30 seconds
- ✅ Rankings with gold/silver/bronze styling
- ✅ Category breakdown for the winner
- ✅ Real-time updates from Google Sheets