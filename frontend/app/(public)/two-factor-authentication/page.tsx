import OtpForm from "@/components/module/twoFactor/form";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { notFound } from "next/navigation";

const TwoFactorAuthentication = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string; user_id: string }>;
}) => {
  const params = await searchParams;
  if (!params.id || !params.user_id) {
    notFound();
  }
  return (
    <div>
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-surface"></div>
        <div className="absolute top-0 right-0 w-150 h-150 bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-primary-container/5 rounded-full blur-[100px]"></div>
        <div
          className="absolute inset-0 opacity-10"
          data-alt="Abstract geometric dark background with subtle blue gradients and atmospheric lighting for a high-security tech aesthetic"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDWetDxLPYGad91397A_KdiW2DmjwEg2Tg1ia_G4HLTrLzcaMbsWdZidEQt1TRVFy9bhOOgVp_NYO4PswCVIi7YgtOZNACY7IJpSpsCpj1TsVaXgMS3OcpDKn-oJm3-c-HD1baciSUkaNGFxqwfH6-472KEa4okslUFJioj9vxxuEvQ4WhzfDD5AFWlj7aB7scA8gg4_pyjPi8SZ1jbafEU4sUkST_K4EvcNJb720RK2g_1AHnMYyg')",
          }}
        ></div>
      </div>

      <main className="relative z-10 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-120 space-y-10">
          <div className="bg-surface-container-low rounded-4xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <OtpForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default TwoFactorAuthentication;
