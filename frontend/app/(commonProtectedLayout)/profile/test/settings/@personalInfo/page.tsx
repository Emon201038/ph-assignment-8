import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BadgeCheck, Edit } from "lucide-react";
import React from "react";

const PersonalInfoPage = () => {
  return (
    <section className="bg-surface-container-low rounded-4xl ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold font-headline text-on-surface">
            Personal Information
          </h2>
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size={"icon"}
            className="rounded-full p-1 tooltip"
            title="Edit Personal Information"
          >
            <Edit size={16} />
          </Button>
          <BadgeCheck className="text-blue-700" size={32} />
        </div>
      </div>

      <Card className="gap-0 py-4">
        <CardContent className="py-0 ">
          <div className="grid grid-cols-3 items-center gap-1">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Full Name
            </div>
            <h1 className="col-span-2">Emdadul Hoque Emon</h1>
          </div>
          <div className="grid grid-cols-3 items-center gap-1">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Email
            </div>
            <h1 className="col-span-2">emdadul2580@gmail.com</h1>
          </div>
          <div className="grid grid-cols-3 items-center gap-1">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Phone
            </div>
            <h1 className="col-span-2">+1 (555) 0123-4567</h1>
          </div>
          <div className="grid grid-cols-3 items-center gap-1">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Date of Birth
            </div>
            <h1 className="col-span-2">January 15, 1990</h1>
          </div>
          <div className="grid grid-cols-3 items-center gap-1">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Blood Group
            </div>
            <h1 className="col-span-2">O+</h1>
          </div>
          <div className="grid grid-cols-3 items-center gap-1">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              City
            </div>
            <h1 className="col-span-2">Dhaka</h1>
          </div>
          <div className="grid grid-cols-3 items-center gap-1">
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Country
            </div>
            <h1 className="col-span-2">Bangladesh</h1>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PersonalInfoPage;
