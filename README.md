# 🏆 Emmy Awards Competition

A simple mobile-first website for tracking Emmy predictions and displaying live results.

## How It Works

1. **Judges enter predictions** directly into Google Sheets
2. **Host enters actual winners** as they're announced 
3. **Website displays live results** with percentages calculated automatically
4. **Auto-refreshes** every 30 seconds during the ceremony

## Features

- 📱 **Mobile-first design** - Perfect for phones during the ceremony
- 🥇 **Live leaderboard** with gold/silver/bronze styling
- 📊 **Automatic scoring** - Calculates percentages from Google Sheets
- 🔄 **Real-time updates** - No manual refreshing needed
- 🎯 **Category breakdown** - See exactly which picks were correct

## Setup

1. **Create Google Sheet** with the structure in `SETUP_INSTRUCTIONS.md`
2. **Make sheet public** (Anyone with link can view)
3. **Update Sheet ID** in `results.js`
4. **Open `results.html`** to see live results

## Files

- `results.html` - Main results page
- `results.css` - Mobile-first styling
- `results.js` - Google Sheets integration
- `SETUP_INSTRUCTIONS.md` - Detailed setup guide

## 2027 Emmy Categories

- Drama Series, Lead/Supporting Actor/Actress (5 categories)
- Comedy Series, Lead/Supporting Actor/Actress (5 categories) 
- Limited Series, Lead Actor/Actress (3 categories)
- Variety Series (1 category)

**Total: 14 categories**

Built with vanilla HTML/CSS/JavaScript for maximum compatibility and speed.