import ContactDeleteConfirmation from "@/components/module/settings/ContactDeleteConfirmation";
import EmergencyContactModal from "@/components/module/settings/EmergencyContactModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IResponse } from "@/interfaces";
import { IEmergencyContact } from "@/interfaces/user.interface";
import { serverFetch } from "@/lib/server-fetch";
import { auth } from "@/lib/session";
import { Edit, HeartPulse, PlusCircle, Trash2Icon } from "lucide-react";
import { redirect } from "next/navigation";

const EmergencyContactPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login?callback=/my-profile/test/settings");
  }

  const emergencyContacts = await serverFetch.get(
    "/v2/users/emergency-contacts/" + session.id,
  );

  const contacts: IResponse<IEmergencyContact[]> =
    await emergencyContacts.json();

  return (
    <section className="bg-surface-container-low rounded-4xl ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold font-headline text-on-surface">
            Emergency Contact
          </h2>
        </div>
        <div className="flex gap-2 items-center">
          <EmergencyContactModal userId={session.id} isEdit={false}>
            <Button
              variant="outline"
              size={"icon"}
              className="rounded-full p-1 tooltip"
              data-tooltip-content="Add Emergency Contact"
              title="Add Emergency Contact"
            >
              <PlusCircle size={16} />
            </Button>
          </EmergencyContactModal>
          <HeartPulse className="text-blue-700" size={32} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {contacts?.data?.length === 0 ? (
          <p className="text-sm text-center opacity-85 md:col-span-2">
            No emergency contacts added yet. Please add at least one contact for
            safety purposes.
          </p>
        ) : (
          contacts?.data?.map((contact) => (
            <Card key={contact.id} className="py-4 gap-0">
              <CardHeader className="py-0">
                <div className="flex justify-between items-center">
                  <EmergencyContactModal
                    userId={session.id}
                    contact={contact}
                    isEdit={true}
                  >
                    <div
                      title="Edit Emergency Contact"
                      className="cursor-pointer hover:text-primary justify-start"
                    >
                      <Edit size={16} />
                    </div>
                  </EmergencyContactModal>
                  <ContactDeleteConfirmation id={contact.id}>
                    <div
                      title="Delete Emergency Contact"
                      className="cursor-pointer hover:text-destructive justify-end"
                    >
                      <Trash2Icon size={16} />
                    </div>
                  </ContactDeleteConfirmation>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 items-center gap-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Relation
                  </div>
                  <h1 className="col-span-2">{contact.name}</h1>
                </div>
                <div className="grid grid-cols-3 items-center gap-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Email
                  </div>
                  <h1 className="col-span-2">{contact.email}</h1>
                </div>
                <div className="grid grid-cols-3 items-center gap-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Number
                  </div>
                  <h1 className="col-span-2">{contact.phone}</h1>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        {/* <Card className="py-4 gap-0">
          <CardHeader className="py-0">
            <div className="flex justify-between items-center">
              <div
                title="Edit Emergency Contact"
                className="cursor-pointer hover:text-primary justify-start"
              >
                <Edit size={16} />
              </div>
              <div
                title="Delete Emergency Contact"
                className="cursor-pointer hover:text-destructive justify-end"
              >
                <Trash2Icon size={16} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 items-center gap-1">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Relation
              </div>
              <h1 className="col-span-2">Father</h1>
            </div>
            <div className="grid grid-cols-3 items-center gap-1">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Email
              </div>
              <h1 className="col-span-2">emdadul2580@gmail.com</h1>
            </div>
            <div className="grid grid-cols-3 items-center gap-1">
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Number
              </div>
              <h1 className="col-span-2">+1 (555) 0123-4567</h1>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </section>
  );
};

export default EmergencyContactPage;
