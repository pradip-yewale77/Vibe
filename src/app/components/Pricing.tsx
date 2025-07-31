'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

const Pricing = () => {
  const [annualBilling, setAnnualBilling] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: annualBilling ? "$99" : "$119",
      period: annualBilling ? "/year" : "/month",
      description: "Perfect for small teams",
      features: [
        "Up to 3 projects",
        "5GB storage",
        "Basic analytics",
        "Email support"
      ],
      cta: "Get Started"
    },
    {
      name: "Professional",
      price: annualBilling ? "$299" : "$349",
      period: annualBilling ? "/year" : "/month",
      description: "For growing businesses",
      features: [
        "Unlimited projects",
        "50GB storage",
        "Advanced analytics",
        "Priority support",
        "Custom domains"
      ],
      popular: true,
      cta: "Start Free Trial"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations",
      features: [
        "Unlimited everything",
        "Dedicated account manager",
        "Single Sign-On (SSO)",
        "Custom integrations",
        "24/7 phone support",
        "Security audit"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-dark">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Pricing Plans
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Choose the perfect plan for your needs. Start small and upgrade as you grow.
          </p>
          
          <div className="flex items-center space-x-4 pt-4 pb-8">
            <Label htmlFor="billing-toggle">Monthly</Label>
            <Switch 
              id="billing-toggle" 
              checked={annualBilling}
              onCheckedChange={setAnnualBilling}
            />
            <Label htmlFor="billing-toggle">Annual</Label>
            <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full ml-4">
              Save 20%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`flex flex-col h-full ${plan.popular ? "border-2 border-blue-500 dark:border-blue-400 shadow-lg" : ""}`}
            >
              <CardHeader>
                {plan.popular && (
                  <span className="bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-full w-fit mx-auto">
                    POPULAR
                  </span>
                )}
                <CardTitle className="text-2xl font-bold text-center mt-4">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline justify-center mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, featIndex) => (
                    <li key={featIndex} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  size="lg" 
                  className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;