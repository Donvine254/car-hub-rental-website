'use client'

import * as React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "What are the age requirements for renting a car?",
    answer: "The minimum age for renting a vehicle is 18 years old. However, renters aged 18-25 may be subject to a young driver surcharge. Some vehicle categories may have higher age restrictions."
  },
  {
    question: "What documents do I need to rent a car?",
    answer: "You need a valid driving license held for a minimum of one year. International renters must provide a valid international driving permit along with their original license. We also require a valid credit card for the reservation and deposit."
  },
  {
    question: "What insurance options are available?",
    answer: "We offer several insurance options: 1) Basic Insurance: Included in all rentals, covers third-party liability. 2) Theft Protection Insurance (TPI): Available for an additional fee, reduces liability in case of theft. 3) Collision Damage Waiver (CDW): Offered for an additional fee, reduces liability for damage to the rental vehicle."
  },
  {
    question: "How does the pricing work?",
    answer: "Our pricing is based on the vehicle category and rental duration. A pre-authorization hold will be placed on your credit card at the time of pickup. Additional charges may apply for fuel (if not returned at the same level), late returns, and any traffic or parking fines incurred during the rental period."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards (Visa, MasterCard, American Express) for reservations and deposits. Debit cards are accepted for payment upon return but not for reservation or deposit. Cash payments are not accepted."
  },
  {
    question: "Can I take the rental car across borders?",
    answer: "Cross-border travel must be declared and approved at the time of reservation. Additional fees and insurance requirements may apply, and some vehicle categories may not be eligible. You're responsible for obtaining any necessary documentation for cross-border travel."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Modifications to reservations are subject to availability and may result in price changes. Cancellations made with less than 24 hours' notice may incur a fee."
  },
  {
    question: "How should I return the vehicle?",
    answer: "Vehicles must be returned in the same condition as received, allowing for normal wear and tear. The fuel level should be the same as at pickup to avoid refueling fees. Excessive dirt or stains may result in an additional cleaning fee."
  }
]

export default function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className="flex justify-between">
            <span>{faq.question}</span>
            <PlusMinusIcon />
          </AccordionTrigger>
          <AccordionContent>
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function PlusMinusIcon() {
  return (
    <div className="relative w-6 h-6">
      <Plus className="absolute transition-opacity duration-200 ease-in-out opacity-100 group-data-[state=open]:opacity-0" />
      <Minus className="absolute transition-opacity duration-200 ease-in-out opacity-0 group-data-[state=open]:opacity-100" />
    </div>
  )
}

