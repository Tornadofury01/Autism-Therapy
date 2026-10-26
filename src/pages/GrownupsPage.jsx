import { Screen } from "../components/Screen";

export function GrownupsPage() {
  return (
    <Screen backTo="/" title="For parents and therapists">
      <h1 className="text-4xl font-bold tracking-tight">For parents and therapists</h1>
      <div className="mt-6 max-w-3xl space-y-8 text-xl">
        <section>
          <h2 className="text-2xl font-bold">What this is</h2>
          <p className="mt-2">
            Practice Visit lets a child look at a place before the real visit. Two places are ready: the Texas State Capitol, and a Washington, DC trip. The DC videos are there to help a child get used to public transport and find the way around the city, from the Metro ride to walking between the monuments. Other places are not ready yet.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">How it behaves</h2>
          <p className="mt-2">
            Videos never start on their own. There are no timers. A child can pause, take a break, or ask a practice question by typing or by tapping Talk. The microphone stays off until Talk is tapped, and it turns off again when they tap to stop. If Read answers out loud is on, the answer is spoken after it arrives. A Stop button ends that sound right away.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold">What is still a sample</h2>
          <p className="mt-2">
            The Capitol parts, and the Washington, DC train trip, are short videos. They start only when a child taps play. Question answers come from a helper on this computer, using facts from the video. Questions, answers, and voice recordings are not saved. This app does not replace a parent, teacher, or therapist. A Colors button in the corner changes the color scheme on this device.
          </p>
        </section>
      </div>
    </Screen>
  );
}
