"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

export type HistoryPageData = {
  _id?: string;
  locale: string;
  missionPresence: string;
  apostolicVicariate: string;
  archdiocesisErection: string;
  baptizedCatholics: number;
  nonCatholicChristians: number;
  muslims: number;
  totalPopulation: number;
  diocesanPriests: number;
  catechists: number;
  geographicSituation: string;
  strategicSituation: string;
  spokenLanguages: string;
  migrationIssue: string;
  landHeritage: string;
  infrastructures: string;
  conclusion: string;
};

type Props = {
  item: HistoryPageData | null;
  onSave: (data: HistoryPageData) => Promise<void>;
  onCancel: () => void;
};

export default function HistoryPageForm({ item, onSave, onCancel }: Props) {
  const [formData, setFormData] = useState<HistoryPageData>({
    locale: item?.locale || "fr",
    missionPresence: item?.missionPresence || "1890",
    apostolicVicariate: item?.apostolicVicariate || "1931",
    archdiocesisErection: item?.archdiocesisErection || "04 septembre 1955",
    baptizedCatholics: item?.baptizedCatholics || 2371213,
    nonCatholicChristians: item?.nonCatholicChristians || 656961,
    muslims: item?.muslims || 122026,
    totalPopulation: item?.totalPopulation || 4285042,
    diocesanPriests: item?.diocesanPriests || 298,
    catechists: item?.catechists || 3338,
    geographicSituation: item?.geographicSituation || "",
    strategicSituation: item?.strategicSituation || "",
    spokenLanguages: item?.spokenLanguages || "",
    migrationIssue: item?.migrationIssue || "",
    landHeritage: item?.landHeritage || "",
    infrastructures: item?.infrastructures || "",
    conclusion: item?.conclusion || "",
  });

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl my-8">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <h2 className="text-xl font-bold text-neutral-900">
            Modifier la page Historique
          </h2>
          <button
            onClick={onCancel}
            className="text-neutral-500 hover:text-neutral-700"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section I - Dates historiques */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Dates clés</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Présence missionnaire
                </label>
                <input
                  type="text"
                  value={formData.missionPresence}
                  onChange={(e) => setFormData({ ...formData, missionPresence: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="1890"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Vicariat Apostolique
                </label>
                <input
                  type="text"
                  value={formData.apostolicVicariate}
                  onChange={(e) => setFormData({ ...formData, apostolicVicariate: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="1931"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Érection en Archidiocèse
                </label>
                <input
                  type="text"
                  value={formData.archdiocesisErection}
                  onChange={(e) => setFormData({ ...formData, archdiocesisErection: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                  placeholder="04 septembre 1955"
                />
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Statistiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Catholiques baptisés
                </label>
                <input
                  type="number"
                  value={formData.baptizedCatholics}
                  onChange={(e) => setFormData({ ...formData, baptizedCatholics: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Chrétiens non-catholiques
                </label>
                <input
                  type="number"
                  value={formData.nonCatholicChristians}
                  onChange={(e) => setFormData({ ...formData, nonCatholicChristians: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Musulmans
                </label>
                <input
                  type="number"
                  value={formData.muslims}
                  onChange={(e) => setFormData({ ...formData, muslims: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Population totale
                </label>
                <input
                  type="number"
                  value={formData.totalPopulation}
                  onChange={(e) => setFormData({ ...formData, totalPopulation: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Prêtres diocésains
                </label>
                <input
                  type="number"
                  value={formData.diocesanPriests}
                  onChange={(e) => setFormData({ ...formData, diocesanPriests: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Catéchistes
                </label>
                <input
                  type="number"
                  value={formData.catechists}
                  onChange={(e) => setFormData({ ...formData, catechists: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Textes descriptifs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-neutral-900">Descriptions</h3>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Situation géographique
              </label>
              <textarea
                value={formData.geographicSituation}
                onChange={(e) => setFormData({ ...formData, geographicSituation: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Situation stratégique
              </label>
              <textarea
                value={formData.strategicSituation}
                onChange={(e) => setFormData({ ...formData, strategicSituation: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Langues parlées
              </label>
              <textarea
                value={formData.spokenLanguages}
                onChange={(e) => setFormData({ ...formData, spokenLanguages: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Question migratoire
              </label>
              <textarea
                value={formData.migrationIssue}
                onChange={(e) => setFormData({ ...formData, migrationIssue: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Patrimoine foncier
              </label>
              <textarea
                value={formData.landHeritage}
                onChange={(e) => setFormData({ ...formData, landHeritage: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Infrastructures
              </label>
              <textarea
                value={formData.infrastructures}
                onChange={(e) => setFormData({ ...formData, infrastructures: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Conclusion
              </label>
              <textarea
                value={formData.conclusion}
                onChange={(e) => setFormData({ ...formData, conclusion: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-neutral-300 rounded-md"
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
              disabled={saving}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#BE2722] rounded-md hover:bg-[#9d1f1b] disabled:opacity-50"
              disabled={saving}
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
