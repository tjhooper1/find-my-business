import type { BusinessGuide } from "../types";

// Business page write-ups, keyed by business id. Drafted, then reviewed and
// edited by hand before publishing. Keep claims general enough to hold
// everywhere: rules, prices and requirements vary by location.

export const GUIDES: Record<string, BusinessGuide> = {
  "coffee-cart": {
    overview: [
      "A coffee cart is a small espresso setup on wheels, or a tent and a table, that you take to where people already are: farmers markets, office lobbies, weddings, school events and corporate parties. Most carts earn money two ways: selling drinks by the cup at public spots, and booking private events where the host pays a flat fee or a drinks package.",
      "The coffee is the easy part. The real job is logistics: permits, water, power, setting up and breaking down, and keeping the line moving when 40 people show up at once.",
    ],
    typicalWeek: [
      "Two or three early-morning shifts at markets or regular office spots",
      "A weekend wedding or private event, booked weeks ahead",
      "Restocking milk, cups and beans, plus a trip to your commissary kitchen to clean and refill",
      "Answering event inquiries and sending quotes",
      "Looking after the espresso machine and grinder, which don't love being moved around",
    ],
    firstCustomers: [
      "Call your local health department before you buy anything. Ask what a mobile food unit needs where you live: many places require a permit, an approved commissary kitchen, and specific sinks and water tanks on the cart.",
      "Start with the cheapest legal setup, using rented or used gear. A season at one farmers market will teach you more than a business plan.",
      "Apply to markets and community events early. Good spots fill up months ahead.",
      "Offer a discounted first booking to an office manager or event planner you know, and ask for photos and a review afterwards.",
      "Post photos from every event. Private bookings are where the money is, and they mostly come from people who saw you at someone else's event.",
    ],
    pricing:
      "Drinks at public spots are priced per cup, usually close to local coffee shop prices. Private events are typically a flat fee for a set number of hours, or a prepaid number of drinks with a minimum. Events usually pay much better per hour than markets, so many carts fill weekends with bookings and use markets to get seen.",
    mistakes: [
      "Buying an expensive custom cart before confirming what the health department will approve",
      "Underestimating power and water: many commercial espresso machines need more power than a standard outlet or a small generator can supply",
      "Pricing events by hours of service and forgetting setup, travel and cleanup time",
      "Depending only on outdoor markets, which disappear in bad weather",
    ],
    skipIf: [
      "You're not a morning person, or you don't want to work most weekends",
      "Lifting heavy equipment and standing for hours isn't realistic for you",
      "Permits, inspections and rules that change from city to city would wear you down",
    ],
  },

  "ux-designer": {
    overview: [
      "A UX consultant helps companies figure out where people get stuck in their app or website, and then fixes it. The work splits into research (interviewing users, watching them try tasks, reading analytics) and design (wireframes, prototypes and finished screens).",
      "Most independent UX consultants work with startups and small software companies that can't justify a full-time designer, or with agencies that need extra help. Your strongest selling point isn't pretty screens. It's being able to say \"here's where you're losing customers, and why.\"",
    ],
    typicalWeek: [
      "Two or three user interviews or usability tests, usually over video",
      "Turning notes into a short findings report with clear priorities",
      "Wireframing or prototyping in a tool like Figma",
      "A review call to walk the client through your recommendations",
      "Work on your portfolio and outreach, especially early on",
    ],
    firstCustomers: [
      "Build two or three case studies, even unpaid ones: redesign a flow for a local nonprofit or a friend's product, and document the problem, your process and the result.",
      "Write your portfolio around process and outcomes, not just final screens. Clients hire you for how you think.",
      "Offer a fixed-price UX audit: you review one key flow, test it with a handful of users and hand over a prioritized list of fixes. It's an easy first yes.",
      "Reach out to early-stage founders and small agencies. LinkedIn and startup communities tend to work better for this than general freelance marketplaces.",
      "Use every audit to pitch the design work that follows from it.",
    ],
    pricing:
      "Beginners often start with fixed-price audits or small projects. Experienced consultants charge by the project or by the day, and some sell monthly retainers to startups that need ongoing design. Charging by the project, not the hour, means you benefit when you get faster.",
    mistakes: [
      "Skipping research and jumping straight to visuals",
      "Delivering a long report nobody reads instead of a short, prioritized list",
      "Agreeing to design a whole app before you can scope it properly",
      "Guessing about users instead of asking for analytics or real people to talk to",
    ],
    skipIf: [
      "You mainly want to make beautiful things. UX is about tradeoffs, constraints and other people's goals",
      "Defending your recommendations to skeptical founders sounds exhausting",
      "You don't enjoy talking to strangers about how they use things",
    ],
  },

  "yoga-instructor": {
    overview: [
      "Most yoga and Pilates instructors start by teaching classes at studios and gyms, then build a business on top of that: private sessions, corporate classes, workshops, retreats and online classes. Studio classes give you practice and a following. The extras are where your income grows.",
      "It's a people business as much as a movement one. Students come back for the teacher, so how you make people feel matters as much as your sequencing.",
    ],
    typicalWeek: [
      "Six to twelve group classes across one or more studios or gyms",
      "A few private clients, at their homes, a studio or online",
      "Planning sequences and playlists",
      "Posting on social media and emailing students about upcoming classes",
      "Your own practice, which is easy to lose when teaching gets busy",
    ],
    firstCustomers: [
      "Complete a recognized teacher training. For yoga, many studios look for a 200-hour training registered with Yoga Alliance. Pilates studios often ask for a comprehensive mat or reformer certification.",
      "Audition at studios and gyms, and offer to sub classes. Subbing is how most new teachers get noticed.",
      "Collect students' emails from day one, so they can follow you and not just the studio.",
      "Offer private sessions to regulars who stay after class with questions.",
      "Pitch a weekly class to local offices, schools or senior centers.",
      "Get liability insurance before you teach anywhere outside a studio.",
    ],
    pricing:
      "Studios usually pay per class, sometimes with a bonus per student. Private sessions, corporate classes and workshops pay much more per hour, which is why experienced teachers move toward them. Retreats and online memberships can add up, but you need an audience to fill them.",
    mistakes: [
      "Relying entirely on studio pay, which rarely rises much",
      "Teaching so many classes that your body burns out",
      "Letting the studio own your relationship with your students",
      "Treating social media as optional. It's how many students choose a teacher now",
    ],
    skipIf: [
      "You need steady income soon. Filling a schedule takes time",
      "Early mornings, evenings and weekends don't work for you. That's when people take class",
      "Standing in front of a room every day sounds draining",
    ],
  },

  "social-media-manager": {
    overview: [
      "A social media manager runs a business's accounts: planning posts, creating or collecting photos and videos, writing captions, replying to comments and reporting on what worked. Most freelancers serve local businesses like restaurants, salons, gyms and real estate agents, who know they should post but never find the time.",
      "The job mixes creative work with steady routine. Clients care less about follower counts than about whether posting brings in customers, so the managers who last connect their work to bookings, calls and sales.",
    ],
    typicalWeek: [
      "Planning next week's content calendar for each client",
      "Shooting photos and short videos on-site, or editing what clients send you",
      "Writing captions and scheduling posts",
      "Checking in every day to reply to comments and messages",
      "A short monthly report: what you posted, what performed and what's next",
    ],
    firstCustomers: [
      "Pick a niche you understand, like restaurants or fitness studios. It makes both your pitch and your content sharper.",
      "Run your own account, or a friend's business account, for a month as a live portfolio.",
      "Message or walk into local businesses whose accounts have gone quiet, with two or three specific ideas for them.",
      "Offer a simple starter package with a set number of posts per week and a clear price.",
      "Ask happy clients for referrals. Local business owners talk to each other.",
    ],
    pricing:
      "Almost always a monthly retainer, priced by the number of platforms, posts per week and whether you create the content or only schedule it. Content shoots, video editing and running ads are usually add-ons.",
    mistakes: [
      "Saying yes to every platform instead of doing two well",
      "Vague scope and unlimited revisions. Write down exactly what's included",
      "Reporting likes instead of results the client cares about",
      "Charging so little that you need too many clients to make a living",
    ],
    skipIf: [
      "You don't want to be online every day, including some weekends",
      "Chasing clients for photos and approvals would frustrate you",
      "Constant platform changes sound exhausting rather than interesting",
    ],
  },

  "cooking-classes": {
    overview: [
      "A cooking class business teaches people to make something they're excited about: fresh pasta, dumplings, sourdough, knife skills or a regional cuisine. Classes happen in rented commercial kitchens, at hosts' homes, in community spaces or online, and they're often bought as gifts, date nights and team-building events.",
      "You're running an experience as much as a lesson. People pay for a fun evening and the confidence to cook the dish again at home, so warmth and pacing matter as much as the recipes.",
    ],
    typicalWeek: [
      "Two to four classes, mostly evenings and weekends",
      "Shopping for ingredients and prepping before each class",
      "Testing recipes until they work for beginners in a fixed amount of time",
      "Answering inquiries from companies and private groups",
      "Cleanup, which takes longer than you'd expect",
    ],
    firstCustomers: [
      "Check your local rules first. Depending on where you teach, you may need a food handler's certificate, a permit, insurance or a licensed kitchen.",
      "Run a few low-priced classes for friends of friends, and collect photos and testimonials.",
      "List your classes on local event sites and experience marketplaces.",
      "Partner with a kitchen store, winery, brewery or community center that has space and an audience.",
      "Pitch team-building classes to local companies. One private group can fill a whole class.",
    ],
    pricing:
      "Public classes are priced per person, with a cap on class size. Private and corporate events are usually a flat fee, or a per-person price with a minimum headcount. Ingredients and kitchen rental come out of every class, so track them carefully.",
    mistakes: [
      "Choosing recipes too ambitious for beginners to finish in two hours",
      "Leaving kitchen rental, ingredients and prep time out of your price",
      "Not asking about allergies and dietary needs before class",
      "Relying only on public classes, when private events fill faster",
    ],
    skipIf: [
      "Hosting a room full of strangers sounds stressful rather than fun",
      "You don't want to work evenings and weekends",
      "You love cooking, but not explaining what you're doing while you do it",
    ],
  },

  "paid-ads-specialist": {
    overview: [
      "A paid ads specialist sets up and manages ad campaigns on Google, Meta (Facebook and Instagram), TikTok and similar platforms. You choose who to target, write and test ads, set budgets and keep adjusting until each dollar spent brings back more than a dollar.",
      "It's numbers-heavy work. Clients judge you on cost per lead or return on ad spend, and results swing with seasons, platform changes and the client's own website. Explaining that clearly is half the job.",
    ],
    typicalWeek: [
      "Daily checks on each account for overspending or broken ads",
      "Testing new ads and audiences",
      "Adjusting bids and budgets based on what's converting",
      "Making sure conversion tracking still works",
      "Weekly or monthly reports and calls with clients",
    ],
    firstCustomers: [
      "Learn one platform properly first. Google and Meta both offer free training and certifications.",
      "Run a small campaign with your own money, for a side project or a friend's business, so you have real numbers to show.",
      "Focus on one type of client, like local service businesses or online stores, so you learn what works for them.",
      "Offer a free audit of a business's current campaigns, and show them where money is being wasted.",
      "Partner with web designers and agencies whose clients keep asking about ads.",
    ],
    pricing:
      "Common models are a flat monthly fee, a percentage of ad spend, or a percentage with a monthly minimum. Setup is often billed separately. The ad budget itself is usually paid by the client straight to the platform.",
    mistakes: [
      "Launching campaigns before tracking is set up correctly",
      "Promising specific results when you don't control the product, price or website",
      "Taking clients whose budgets are too small to test anything",
      "Changing too many things at once, so you can't tell what worked",
    ],
    skipIf: [
      "Spreadsheets and dashboards bore you",
      "Being responsible for someone else's money would keep you up at night",
      "You want work that stays the same. These platforms change constantly",
    ],
  },

  reseller: {
    overview: [
      "Resellers buy items for less than they're worth, at thrift stores, garage sales, estate sales, clearance racks and auctions, and sell them online on sites like eBay, Poshmark, Mercari and Facebook Marketplace. Many specialize in one area: vintage clothing, sneakers, tools, electronics, toys or books.",
      "Your profit is made when you buy, not when you sell. Knowing what sells and for how much is the real skill, and it grows with every item you look up.",
    ],
    typicalWeek: [
      "A few sourcing trips to thrift stores, garage sales or estate sales",
      "Cleaning, measuring and photographing items",
      "Writing listings and pricing them against recent sold prices",
      "Packing orders, shipping them and answering buyer messages",
      "Reviewing what hasn't sold and lowering prices or bundling it",
    ],
    firstCustomers: [
      "Start by selling things you already own. You'll learn the platforms with no risk.",
      "Before buying anything, look up sold listings (not asking prices) on your phone, right there in the store.",
      "Pick one or two categories you know or enjoy, and learn them deeply.",
      "Set a small sourcing budget, and at first only reinvest your profits.",
      "Set up a simple, consistent photo spot. Good photos sell faster.",
    ],
    pricing:
      "Each item is priced from recent sold prices for the same thing. Platform fees, shipping supplies and the items that never sell all come out of your margin, so many resellers only buy at a small fraction of the expected sale price.",
    mistakes: [
      "Buying based on asking prices instead of sold prices",
      "Letting unlisted inventory pile up. It's money sitting in boxes",
      "Forgetting fees and shipping when you set prices",
      "Not recording what you paid for each item, which makes taxes a mess",
    ],
    skipIf: [
      "You don't have room for inventory and a packing area",
      "Listing and shipping the same way every day sounds tedious",
      "Income that changes from week to week would stress you out",
    ],
  },

  copywriter: {
    overview: [
      "Conversion copywriters write words whose job is to get someone to act: sales pages, landing pages, ads, product descriptions and email sequences. It differs from general writing because every piece has a measurable goal, like sign-ups or purchases.",
      "Good copy starts with research, not writing. Strong copywriters spend a lot of time reading customer reviews, interviewing customers and studying competitors, then write using the customers' own words.",
    ],
    typicalWeek: [
      "Research for a new project: customer reviews, surveys and interviews",
      "Drafting a sales page or an email sequence",
      "Revising based on client feedback",
      "Checking results from earlier work, like open and conversion rates",
      "Outreach and pitching, especially in your first year",
    ],
    firstCustomers: [
      "Write sample pieces for real products you admire, clearly labeled as samples, to build a portfolio.",
      "Pick a niche, like software companies, coaches or online stores. Specialists get hired faster and paid more.",
      "Offer to rewrite one email or landing page for a small business in exchange for a testimonial.",
      "Look for businesses sending ads to weak landing pages. They're already spending money and losing it.",
      "Partner with designers and marketing agencies that need copy for their clients.",
    ],
    pricing:
      "Most copywriters charge per project, such as a sales page or a five-email sequence, rather than per word or per hour. Experienced copywriters sometimes add a monthly retainer for ongoing work, or a bonus tied to results.",
    mistakes: [
      "Skipping research and writing clever copy that doesn't sell",
      "Charging per word, which punishes you for being concise",
      "Taking projects with no clear goal or way to measure success",
      "Not keeping track of results. Numbers are your best sales pitch",
    ],
    skipIf: [
      "You'd rather write to express yourself than to hit someone else's goals",
      "Having your work edited and measured would frustrate you",
      "You don't want to learn the persuasion and marketing side of writing",
    ],
  },

  "language-teacher": {
    overview: [
      "Online language teachers give one-on-one or small-group lessons over video to learners around the world. Many start on tutoring marketplaces that bring students to them, then move regulars to their own booking system and add group classes or courses.",
      "Students learn for different reasons: travel, work, exams, family or moving abroad. Teachers who focus on one goal, like business English or exam prep, tend to fill their schedules faster and charge more.",
    ],
    typicalWeek: [
      "Ten to twenty lessons spread across time zones, often early or late in the day",
      "Planning lessons and materials for each student's level",
      "Messaging students and handling reschedules",
      "Keeping your marketplace profile and intro video up to date",
      "Building a library of lessons you can reuse",
    ],
    firstCustomers: [
      "Create a profile on one or two tutoring marketplaces, with a friendly, clear intro video.",
      "Choose a focus, like conversation practice for beginners or interview prep in English.",
      "Offer a short trial lesson, and be clear about what students get from regular lessons.",
      "Ask happy students for reviews right away. Reviews drive marketplace bookings.",
      "Once you have regulars, consider moving them to direct booking where the platform's rules allow it.",
    ],
    pricing:
      "Usually per lesson, with discounted packages for buying several at once. Marketplaces take a commission, so students who book you directly are worth more. Specialized lessons, like exam prep or business language, usually command higher rates than general conversation.",
    mistakes: [
      "Competing on price alone on the marketplaces",
      "Having no cancellation policy",
      "Trying to teach everyone everything instead of picking a niche",
      "Booking lessons so tightly back-to-back that quality drops",
    ],
    skipIf: [
      "Hours of talking on video sound draining",
      "Odd hours to match students' time zones won't work for you",
      "Explaining the same grammar point for the tenth time would bore you",
    ],
  },

  "personal-trainer": {
    overview: [
      "Personal trainers design workouts and coach clients through them, in a gym, a park, a client's home or online. Most start inside a gym, where clients are easier to find, then go independent once they have a following. Many add online coaching for clients they don't see in person.",
      "The workouts are the easy part. What keeps clients coming back is accountability, encouragement and helping them stick with it when motivation fades. Trainers who are good at that rarely struggle to find clients.",
    ],
    typicalWeek: [
      "Fifteen to twenty-five sessions, clustered in early mornings and evenings",
      "Writing programs and tracking each client's progress",
      "Check-in messages with online clients and between sessions",
      "Posting content and following up with leads",
      "Your own training and continuing education",
    ],
    firstCustomers: [
      "Get a well-recognized certification. Gyms and insurers commonly look for one from organizations like NASM, ACE, ACSM or NSCA, plus CPR/AED.",
      "Get liability insurance before training anyone outside a gym.",
      "Start at a gym, or offer free assessments to friends and coworkers, to build experience and testimonials.",
      "Pick a focus, like strength for beginners, new parents or older adults.",
      "Share client wins (with permission) and practical tips online. It builds trust before people ever contact you.",
    ],
    pricing:
      "Per session, with discounted packages or monthly plans for a set number of sessions. Small-group training lets you earn more per hour while each person pays less. Online coaching is usually a monthly fee.",
    mistakes: [
      "Selling single sessions instead of packages, which makes income unpredictable",
      "Having no cancellation policy",
      "Working outside your training, like rehab after an injury, instead of referring clients on",
      "Packing your schedule so tightly that you burn out",
    ],
    skipIf: [
      "You need a regular nine-to-five schedule",
      "Being on your feet and active all day isn't realistic for you",
      "Motivating other people sounds draining",
    ],
  },
};
