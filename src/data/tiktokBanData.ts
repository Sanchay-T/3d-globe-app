export interface TiktokBanData {
  country: string;
  type: 'complete' | 'partial';
  details: string;
}

export const tiktokBanData: TiktokBanData[] = [
  {
    country: "India",
    type: "complete",
    details: "Nationwide ban since June 2020 due to national security concerns"
  },
  {
    country: "Afghanistan",
    type: "complete",
    details: "Banned since 2022 by Taliban leadership"
  },
  {
    country: "Iran",
    type: "complete",
    details: "Completely prohibited along with other popular international social media platforms"
  },
  {
    country: "Nepal",
    type: "complete",
    details: "Imposed a nationwide ban in November 2023"
  },
  {
    country: "Jordan",
    type: "complete",
    details: "Banned in December 2022 following protests"
  },
  {
    country: "United States",
    type: "complete",
    details: "Nationwide ban implemented as of January 2025"
  },
  {
    country: "China",
    type: "complete",
    details: "International version not allowed; users can only access Douyin"
  },
  {
    country: "European Union",
    type: "partial",
    details: "Banned on devices owned by EU institutions"
  },
  {
    country: "Australia",
    type: "partial",
    details: "Banned on federal government-issued devices"
  },
  {
    country: "Canada",
    type: "partial",
    details: "Prohibited on government-issued devices"
  },
  {
    country: "United Kingdom",
    type: "partial",
    details: "Banned on government ministers' and civil servants' mobile phones"
  },
  {
    country: "France",
    type: "partial",
    details: "Banned on government employees' phones"
  },
  {
    country: "Belgium",
    type: "partial",
    details: "Banned on devices owned by the federal government"
  },
  {
    country: "Denmark",
    type: "partial",
    details: "Banned on devices issued by the Ministry of Defence"
  },
  {
    country: "Netherlands",
    type: "partial",
    details: "Government officials ordered to delete the app from work phones"
  },
  {
    country: "New Zealand",
    type: "partial",
    details: "Prohibited on devices of lawmakers and Parliament staff"
  },
  {
    country: "Taiwan",
    type: "partial",
    details: "Banned on public sector devices"
  },
  {
    country: "Norway",
    type: "partial",
    details: "Banned on work phones used by ministers and political advisors"
  },
  {
    country: "Latvia",
    type: "partial",
    details: "Banned on Foreign Ministry work devices"
  },
  {
    country: "Estonia",
    type: "partial",
    details: "Banned on state-issued smartphones for officials"
  },
  {
    country: "Kyrgyzstan",
    type: "complete",
    details: "Banned in August 2023 citing concerns about children's development"
  },
  {
    country: "Senegal",
    type: "complete",
    details: "Banned in August 2023 after accusations of spreading hateful content"
  },
  {
    country: "Somalia",
    type: "complete",
    details: "Banned in August 2023 to limit spread of indecent content"
  },
  {
    country: "Indonesia",
    type: "partial",
    details: "Only the online retail function of TikTok is banned"
  },
  {
    country: "Pakistan",
    type: "partial",
    details: "Has temporarily banned TikTok multiple times since 2020"
  }
];