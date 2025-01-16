export const rejectionOptions = {
  kindGeneral: {
    title: "Kind + General Rejection Message",
    message: ({ firstName, jobTitle, businessName, interviewer }: any) => [
      `Hi ${firstName}, I hope this message finds you well! I wanted to personally reach out about your application for the ${jobTitle} role here at ${businessName}.`,
      `We were genuinely impressed by your enthusiasm and background. After careful consideration, we've decided to go in a different direction for this particular role. I know this probably isn't the news you were hoping for, and I'm truly sorry about that.`,
      `Thanks again for your interest in joining us. We wish you all the best in your future endeavors!`,
      `Sincerely, ${interviewer}`,
    ],
  },
  postInterview: {
    title: "Friendly Post-Interview Rejection Note",
    message: ({ firstName, jobTitle, qualityOrExp, interviewer }: any) => [
      `Hey ${firstName}, I hope you're having a good week! I wanted to follow up on your recent interview for our ${jobTitle} role.`,
      `It was a real pleasure getting to know you, and we were all impressed by your ${qualityOrExp}.`,
      `After a lot of discussion, we've decided to move forward with another candidate for this particular position. I know this isn't easy news to hear, and I'm genuinely sorry we couldn't give you a different answer.`,
      `We're all wishing you the very best in your job search and beyond!`,
      `Warmly, ${interviewer}`,
    ],
  },
  promisingCandidate: {
    title: "Promising Candidate Rejection Message",
    message: ({
      firstName,
      jobTitle,
      businessName,
      interviewer,
      skillOrExp,
    }: any) => [
      `Hi ${firstName}, I hope this message finds you in good spirits! I'm reaching out about your application for the ${jobTitle}  role at ${businessName}.`,
      `First off, wow! We were really impressed by your application and the awesome skills and experiences you'd bring to the table. Your ${skillOrExp} particularly caught our eye.`,
      `After a lot of back-and-forth, we've decided to go with another candidate whose experience aligns a bit more closely with some specific needs we have right now. I know this probably isn't the news you were hoping for, and I'm truly sorry about that.`,
      `Here's the thing, though – we really liked what we saw in your application. So much so that we'd love to keep in touch about future opportunities, if you're open to it. We think you could be a fantastic fit for our team down the line.`,
      `Would it be okay if we reached out in the future if something comes up that matches your skills? No pressure at all if you'd rather we didn't.`,
      `Wishing you all the best, ${interviewer}`,
    ],
  },
  underqualifiedSuggestion: {
    title: "Underqualified Candidate Suggestion + Rejection Note",
    message: ({
      firstName,
      jobTitle,
      businessName,
      interviewer,
      expArea,
    }: any) => [
      `Hi ${firstName}, I hope you're having a good day! I'm getting in touch about your application for the ${jobTitle}  role here at ${businessName}.`,
      `After reviewing all the applications, we've decided to move forward with candidates who have a bit more experience in ${expArea}. I know this probably isn't the news you were hoping for, and I'm sorry we couldn't give you a different answer.`,
      `You're clearly passionate about this field, and that's awesome. If you're open to it, I'd be happy to offer a few suggestions for skills or experiences that might be helpful for similar roles in the future. Just let me know if that would be useful.`,
      `We wish you all the best in your job search!`,
      `Sincerely, ${interviewer}`,
    ],
  },
};
