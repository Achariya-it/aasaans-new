import CandidateCard from '../CandidateCard';

export default function CandidateCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <CandidateCard
        id="1"
        name="Sarah Johnson"
        headline="Full Stack Developer"
        location="San Francisco, CA"
        skillPoints={1250}
        skills={["React", "Node.js", "Python", "AWS", "Docker"]}
        isPremium={true}
        unlocked={false}
      />
      <CandidateCard
        id="2"
        name="Michael Chen"
        headline="Data Scientist"
        location="New York, NY"
        skillPoints={980}
        skills={["Python", "TensorFlow", "SQL", "R"]}
        isPremium={true}
        unlocked={true}
      />
      <CandidateCard
        id="3"
        name="Emma Wilson"
        headline="Product Manager"
        location="Austin, TX"
        skillPoints={750}
        skills={["Agile", "Jira", "Figma", "Analytics"]}
        isPremium={false}
      />
    </div>
  );
}
