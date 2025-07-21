# <div align="right">English | [中文](./README.md)</div>
#
# Emotion Drawer

A Next.js-based emotion recording and letting-go app to help users record emotions, seal thoughts, and make peace with their future selves.

## Features

### 🕰️ Time Capsule
- **Private Records**: Like writing a diary or sending a message in a bottle, seal your current emotions, words, or unsent letters
- **Emotion Tags**: Tag each capsule with emotions to record your mood
- **Safe Space**: A completely private outlet for emotional release
- **Review Function**: Review past emotional records at any time to observe mood changes

### 💙 Pact of Letting Go
- **Future Agreement**: Create a "reconciliation" pact with your future self
- **Timed Unlock**: Set a future date to unlock the pact content
- **Mood Dialogue**: Create opportunities to talk with your future self
- **Letting Go Guide**: Help users observe mood changes and move towards true letting go

## Tech Stack

- **Framework**: Next.js 15.4.2
- **Language**: TypeScript
- **Styles**: Tailwind CSS 4
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Package Manager**: pnpm
- **Storage**: LocalStorage

## Quick Start

### Install Dependencies

```bash
pnpm install
```

### Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
emotion-drawer/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── EmotionSelector.tsx    # Emotion selector
│   ├── TimeCapsuleForm.tsx    # Time capsule form
│   ├── TimeCapsuleList.tsx    # Time capsule list
│   ├── LetGoForm.tsx          # Letting go pact form
│   └── LetGoList.tsx          # Letting go pact list
├── lib/                   # Utilities
│   ├── emotions.ts        # Emotion config
│   └── storage.ts         # Local storage utils
├── types/                 # TypeScript types
│   └── index.ts
└── public/               # Static assets
```

## Usage

### Create a Time Capsule
1. Click the "Create Time Capsule" button
2. Enter the capsule title
3. Select your current emotion
4. Write what you want to seal
5. Choose whether to set as private
6. Click "Seal Capsule" to finish

### Create a Pact of Letting Go
1. Switch to the "Pact of Letting Go" tab
2. Click the "Create Pact" button
3. Enter the pact title
4. Select your current emotion
5. Write to your future self
6. Set the unlock time
7. Click "Create Pact" to finish

### View and Manage
- Click any item in the list to expand and view details
- Pacts can only be opened after the set time
- You can delete records you no longer need

## Design Philosophy

This app is inspired by the lyrics: "I don't know what's wrong with me, I can let go, but I can't really let go." It aims to:

- Provide a safe space for emotional expression
- Help users record and understand their emotional changes
- Promote inner reconciliation and letting go through the power of time
- Create opportunities to talk with your future self

## Roadmap

- [ ] Add image upload feature
- [ ] Implement email reminder feature
- [ ] Add emotion statistics and analysis
- [ ] Support export functionality
- [ ] Add theme switching
- [ ] Implement data backup and sync

## Contributing

Feel free to submit Issues and Pull Requests to improve this project.

## License

MIT License
