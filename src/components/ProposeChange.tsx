"use client";

import { useState } from "react";

const projects = [
  "Website - Homepage",
  "Website - Solutions",
  "Website - Webstore",
  "Website - Resources",
  "Website - About",
  "Website - Contact",
  "Vekta",
  "Omniflex",
  "Mediaserv Digital",
];

const types = ["Enhancement", "Adjustment", "New Page", "Bug Fix", "Content Update", "Question"];

export default function ProposeChange() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const project = data.get("project");
    const type = data.get("type");
    const summary = data.get("summary");
    const details = data.get("details");
    const priority = data.get("priority");
    const name = data.get("name");

    const subject = encodeURIComponent(
      `[Tyflex Website] ${type} \u2014 ${project}: ${summary}`
    );
    const body = encodeURIComponent(
      `Proposed by: ${name}\n` +
      `Project: ${project}\n` +
      `Type: ${type}\n` +
      `Priority: ${priority}\n` +
      `Summary: ${summary}\n\n` +
      `Details:\n${details}`
    );

    window.open(`mailto:tamuka@tyflex.co.zw?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-medium rounded-full shadow-lg shadow-brand-red/20 transition-all hover:scale-105"
      >
        <span>💡</span>
        Propose Change
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full max-w-lg bg-brand-dark border border-white/10 rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Propose a Change</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                &times;
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-3">&#10003;</div>
                <p className="text-gray-300">Your email client should open with the proposal. Thanks!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                  <input name="name" type="text" required className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Area</label>
                  <select name="project" required className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50">
                    {projects.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Type</label>
                  <select name="type" required className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50">
                    {types.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Priority</label>
                  <select name="priority" defaultValue="Medium" className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Summary</label>
                  <input name="summary" type="text" required className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50" placeholder="Brief description of the change" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Details</label>
                  <textarea name="details" rows={4} className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand-red/50 resize-none" placeholder="Describe the change in detail..." />
                </div>
                <button type="submit" className="w-full px-4 py-3 bg-brand-red hover:bg-brand-red-dark text-white font-medium rounded-lg transition-colors text-sm">
                  Send Proposal
                </button>
                <p className="text-xs text-gray-500 text-center">Opens your email client with a pre-filled message to tamuka@tyflex.co.zw</p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
