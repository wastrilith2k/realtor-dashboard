__Portland Realtor Intelligence Dashboard__

Demo Build Plan  ·  Target: Ship in 5 Days

James Waller  ·  March 2026

## __The Goal__

Build a focused Portland real estate market dashboard with an AI insight layer\. Ship a live demo in 5 days\. Show it to a realtor contact\. Watch what he reacts to\.

The demo is not a product\. It is a hypothesis test\. What makes him lean forward tells you what to build next\.

## __What We're Building__

Three panels, real data, one AI recommendation:

__Panel__

__What It Shows__

__Data Source__

__Market Overview__

Median price, active inventory, days on market, % listings with price cuts — Portland metro, current month vs prior 6 months

FRED API ~~\+ Redfin CSV~~

~~__Neighborhood Breakdown__~~

~~Same 4 metrics, filterable by Portland neighborhood\. Sellwood, Alberta, St\. Johns, Pearl, etc\. Side\-by\-side comparison\.~~

~~Redfin CSV \(neighborhood level\)~~

__AI Insight Panel__

One plain\-English recommendation based on current data\. E\.g\. "Inventory in Sellwood is down 28% — buyers are competing\. Price aggressively on new listings here\."

Claude API \(synthesizes panels 1\+2\)

That's it\. No auth, no user accounts, no CRM integration\. Just three panels and one smart sentence that tells a realtor what to do\.

## __5\-Day Build Plan__

__Day 1: __Data & Foundation   ·   ~4 hours

__Morning__

__Get FRED API key__

Register at fred\.stlouisfed\.org — free, instant\. Pull: median home price \(MEDLISPRI41051\), active listings \(ACTLISCOU41051\), days on market \(MEDDAYONMAR41051\)

__Morning__

~~__Download Redfin data__~~

~~redfin\.com/news/data\-center → Portland neighborhood CSV\. No API needed, direct download\.~~

__Afternoon__

__Scaffold React app__

Vite \+ TypeScript \+ Tailwind\. No backend yet — load CSVs locally and call FRED API directly from frontend\.

__Afternoon__

__Verify data shape__

Console\.log everything\. Make sure the data is what you think it is before building UI\.

__Day 2: __Market Overview Panel   ·   ~4 hours

__Full day__

__4 core charts__

Median price trend \(line\), Active inventory \(bar\), Days on market \(line\), Price reduction % \(area\)\. Recharts\. Real FRED data\. Portland metro only\.

__End of day__

__Sanity check__

Does it look like a real dashboard or a coding exercise? Show it to your partner\. If they don't understand it in 10 seconds, simplify\.

__Day 3: __Neighborhood Breakdown   ·   ~4 hours

__Morning__

__Neighborhood filter__

Dropdown or tab selector\. Load Redfin CSV, group by neighborhood, render same 4 metrics filtered\.

__Afternoon__

__Comparison view__

Two neighborhoods side by side\. This is the feature most likely to make him lean forward — he thinks in neighborhoods\.

__Afternoon__

__Polish__

Consistent colors, readable labels, mobile\-tolerant layout\. Nothing fancy\.

__Day 4: __AI Insight Panel   ·   ~3 hours

__Morning__

__Claude API integration__

Pass current market snapshot as context\. Prompt: generate one actionable insight for a Portland realtor based on this data\. Keep it under 3 sentences\.

__Afternoon__

__Insight display__

Render as a highlighted callout card above the charts\. Not a chat interface — just one smart sentence that refreshes with the data\.

__Afternoon__

__Prompt tuning__

Make sure the output sounds like advice, not a data summary\. Test with 3\-4 different market scenarios\.

__Day 5: __Deploy & Share   ·   ~2 hours

__Morning__

__Deploy to EC2__

You already have the instance\. nginx \+ serve the built Vite app\. No Docker, no Kubernetes, just serve the static build\.

__Morning__

__Basic auth__

htpasswd via nginx\. Username/password in the email to your realtor contact\. Keeps it from burning tokens publicly\.

__Afternoon__

__Contact realtor__

Short email: built something for realtors, want your honest reaction, here's a link and a login\. No pitch\. No ask\.

__Afternoon__

__LinkedIn post__

"Built a Portland real estate intelligence dashboard in a week\. Here's what I learned about the gap between public data and what realtors actually need\." Link the demo\.

## __Scope Rules — Read These Daily__

- Ship Day 5 before adding any feature not on this list
- No backend unless the frontend literally cannot work without it
- No user accounts, no database, no auth beyond htpasswd
- No voice, no map view, no listing search — those are v2
- If a feature takes more than 2 hours, cut it

## __What Success Looks Like__

Not: "he loved it\."

Success is: he reacts to something specific\. He says "I wish this showed X" or "I already know that but this is useful" or "how does it know that?"

Any strong reaction — positive or negative — is signal\. Silence or politeness is not\.

## __Tech Stack__

__Frontend__

React \+ TypeScript \+ Vite

__Charts__

Recharts

__Styling__

Tailwind CSS

__Data \(macro\)__

FRED API — free, no rate limit issues at demo scale

__Data \(neighborhood\)__

Redfin CSV download — free, no API needed

__AI layer__

Claude API \(claude\-sonnet\-4\-20250514\)

__Hosting__

Your existing EC2 instance

__Auth__

nginx htpasswd — dead simple, no code required

## __After the Demo__

If he reacts well, the next conversation is: would you use this weekly if it updated automatically? What would you pay for that?

If the answer is yes to the first question, you have a product\. The v2 roadmap writes itself from his answers\.

If the answer is no, you still have a portfolio piece, a LinkedIn post, and a much clearer picture of what realtors actually need\.

Either outcome is a win\.

