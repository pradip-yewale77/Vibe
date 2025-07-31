import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
import {
  Badge
} from "@/components/ui/badge";
import {
  Button
} from "@/components/ui/button";
import {
  Separator
} from "@/components/ui/separator";
import {
  RocketIcon,
  LightbulbIcon,
  UsersIcon,
  HandshakeIcon,
  MailIcon,
  CalendarIcon,
  MapPinIcon
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';

const Page = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "10+ years in tech industry. Passionate about building products that solve real problems.",
      avatar: "/avatars/alex.jpg"
    },
    {
      name: "Sarah Williams",
      role: "Lead Designer",
      bio: "Design specialist with focus on user experience and accessibility principles.",
      avatar: "/avatars/sarah.jpg"
    },
    {
      name: "Michael Chen",
      role: "Engineering Lead",
      bio: "Full-stack developer who enjoys creating elegant solutions to complex challenges.",
      avatar: "/avatars/michael.jpg"
    },
    {
      name: "Priya Sharma",
      role: "Marketing Director",
      bio: "Growth hacker with expertise in digital marketing strategies and brand positioning.",
      avatar: "/avatars/priya.jpg"
    }
  ];

  const stats = [
    { value: "2018", label: "Founded in", icon: <CalendarIcon className="w-5 h-5" /> },
    { value: "50+", label: "Team members", icon: <UsersIcon className="w-5 h-5" /> },
    { value: "10k+", label: "Active users", icon: <UsersIcon className="w-5 h-5" /> },
    { value: "Global", label: "Location", icon: <MapPinIcon className="w-5 h-5" /> }
  ];

  return (
    <>
    <Nav/>
      <div className="min-h-screen bg-gradient-to-br md:my-16  py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge variant="outline" className="mb-4 py-1 px-3 bg-blue-50 border-blue-200 text-blue-600">
              <RocketIcon className="w-4 h-4 mr-2" />
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              We're on a mission to make the web better
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-bold">
              Creating tools that empower developers and designers to build amazing digital experiences with ease and efficiency.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                  <p className="text-gray-600 mt-2">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-16 bg-gray-200" />

          {/* Mission Section */}
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <LightbulbIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Simplifying Complexity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    We believe technology should empower, not confuse. Our tools transform complex workflows into intuitive experiences that anyone can master.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Building Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg">
                    We're more than a product - we're a community of creators supporting each other to push boundaries and innovate together.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <UsersIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Meet Our Team</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <Avatar className="w-full h-80 rounded-none">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-gray-200 border-2 border-dashed rounded-none w-full h-full" />
                    </Avatar>
                  </div>
                  <CardHeader className="relative z-20 -mt-16">
                    <CardTitle className="text-white group-hover:text-white transition-colors">{member.name}</CardTitle>
                    <Badge className="w-fit bg-blue-600 text-white group-hover:bg-white group-hover:text-blue-600 transition-colors">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 group-hover:text-gray-800 transition-colors">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16 animate-fade-in">
            <div className="flex items-center mb-8">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <HandshakeIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-white">Our Values</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-none bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-3 h-3 text-dark rounded-full bg-blue-600 mr-3"></div>
                    <h2 className="text-gray-600">Innovation</h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Constantly exploring new ideas and approaches to solve problems in novel ways.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-3"></div>
                    <div className="text-gray-600">Integrity</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Doing the right thing even when no one is watching. Honesty in all our interactions.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-600 mr-3"></div>
                    <div className="text-gray-600">Inclusivity</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Building products and communities where everyone feels welcome and valued.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white mb-16 animate-pulse-slow">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join us on our journey</h2>
            <p className="max-w-2xl mx-auto mb-6 text-blue-100">
              We're always looking for passionate individuals to join our team or collaborate on exciting projects.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                <MailIcon className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-500">
                View Careers
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Page;