# Emmy Contest Setup Instructions

## Step 1: Create Google Sheet

1. **Go to Google Sheets** (sheets.google.com)
2. **Create a new blank spreadsheet**
3. **Name it "Emmy Contest 2027"** (or whatever you prefer)

## Step 2: Set Up Tab 1 - "Judges"

1. **Rename Sheet1** to "Judges"
2. **Copy and paste this header row** into Row 1:

```
Judge | Drama_Series | Drama_Actress | Drama_Actor | Drama_Supporting_Actress | Drama_Supporting_Actor | Comedy_Series | Comedy_Actress | Comedy_Actor | Comedy_Supporting_Actress | Comedy_Supporting_Actor | Limited_Series | Limited_Actress | Limited_Actor | Variety_Series
```

3. **Add judge names** in column A (one per row)
4. **Judges fill in their picks** in the corresponding columns

### Column Mapping (for judges):
- **Drama_Series**: The Diplomat, The Gilded Age, A Knight of the Seven Kingdoms, Paradise, The Pitt, Pluribus, Slow Horses, Your Friends and Neighbors
- **Drama_Actress**: Carrie Coon, Chase Infiniti, Keri Russell, Rhea Seehorn, Zendaya
- **Drama_Actor**: Sterling K. Brown, Gary Oldman, Mark Ruffalo, Rufus Sewell, Noah Wyle
- **Drama_Supporting_Actress**: Taylor Dearden, Fiona Dourif, Allison Janney, Katherine LaNasa, Sepideh Moafi, Julianne Nicholson, Karolina Wydra
- **Drama_Supporting_Actor**: Patrick Ball, Billy Crudup, Shawn Hatosy, Gerran Howell, Jack Lowden, Tom Pelphrey, Carlos Manuel Vesga
- **Comedy_Series**: Abbott Elementary, The Bear, Hacks, Margo's Got Money Troubles, Nobody Wants This, Only Murders in the Building, Shrinking, Widow's Bay
- **Comedy_Actress**: Quinta Brunson, Ayo Edebiri, Elle Fanning, Lisa Kudrow, Jean Smart
- **Comedy_Actor**: Yahya Abdul Mateen II, Steve Carell, Matthew Rhys, Jason Segel, Martin Short
- **Comedy_Supporting_Actress**: Dale Dickey, Hannah Einbinder, Janelle James, Kate O'Flynn, Michelle Pfeiffer, Megan Stalter, Jessica Williams
- **Comedy_Supporting_Actor**: Colman Domingo, Paul W. Downs, Harrison Ford, Nick Offerman, Stephen Root, Michael Urie, Tyler James Williams
- **Limited_Series**: All Her Fault, The Beast In Me, Beef, DTF St. Louis, Love Story: John F. Kennedy Jr. & Carolyn Bessette
- **Limited_Actress**: Claire Danes, Sally Field, Carey Mulligan, Sarah Pigeon, Sarah Snook
- **Limited_Actor**: Riz Ahmed, Jason Bateman, Charlie Hunnam, Oscar Isaac, Matthew Rhys
- **Variety_Series**: The Daily Show, Jimmy Kimmel Live!, Last Week Tonight With John Oliver, The Late Show With Stephen Colbert, Saturday Night Live

## Step 3: Set Up Tab 2 - "Winners"

1. **Add a new sheet** (click + at bottom)
2. **Rename it** to "Winners"
3. **Copy and paste this structure**:

```
Category | Winner
Drama_Series | 
Drama_Actress | 
Drama_Actor | 
Drama_Supporting_Actress | 
Drama_Supporting_Actor | 
Comedy_Series | 
Comedy_Actress | 
Comedy_Actor | 
Comedy_Supporting_Actress | 
Comedy_Supporting_Actor | 
Limited_Series | 
Limited_Actress | 
Limited_Actor | 
Variety_Series | 
```

4. **Fill in winners** as they're announced during the ceremony

## Step 4: Make Sheet Public

1. **Click Share** (top right)
2. **Change to "Anyone with the link can view"**
3. **Copy the Sheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/1ABC123XYZ789.../edit`
   - Sheet ID is the part between `/d/` and `/edit`: `1ABC123XYZ789...`

## Step 5: Update Website Code

1. **Open results.js**
2. **Find this line**: `const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';`
3. **Replace** with your actual Sheet ID: `const SHEET_ID = '1ABC123XYZ789...';`

## Step 6: Test

1. **Open results.html** in a browser
2. **Should show** live results from your Google Sheet
3. **Auto-refreshes** every 30 seconds

## That's it! 

Judges fill the Google Sheet, you enter winners as announced, and the website shows live rankings with percentages automatically calculated.

## Example Judge Entry:
```
Judge: Alice
Drama_Series: The Diplomat
Drama_Actress: Keri Russell  
Drama_Actor: Gary Oldman
etc...
```

## Example Winners Entry:
```
Drama_Series: Slow Horses
Drama_Actress: Zendaya
Drama_Actor: Gary Oldman
etc...
```

**Alice's score**: 2 out of 3 correct = 67%