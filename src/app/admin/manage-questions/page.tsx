"use client";

import PageTitle from "@/components/PageTitle";
import { CATEGORIES } from "@/helper/Constants";
import { McqQuestion } from "@/Type";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

const emptyQuestion: Partial<McqQuestion> = {
  category: "",
  questionText: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOption: "A",
};

export default function ManageMCQQuestions() {
  const [questions, setQuestions] = useState<McqQuestion[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [form, setForm] = useState<Partial<McqQuestion>>(emptyQuestion);
  const [editingId, setEditingId] = useState<number | null>(null);

  // ---------------- FETCH ----------------
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/spring-server/api/admin/mcq/all");
      setQuestions(res.data);
    } catch {
      toast.error("Failed to fetch MCQ questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // ---------------- FILTER ----------------
  const filtered = useMemo(() => {
    return questions.filter((q) => {
      return (
        (search
          ? q.questionText.toLowerCase().includes(search.toLowerCase())
          : true) && (category ? q.category === category : true)
      );
    });
  }, [questions, search, category]);

  // ---------------- ADD / UPDATE ----------------
  const submitForm = async () => {
    try {
      if (editingId) {
        await axios.put(
          `/spring-server/api/admin/mcq/update/${editingId}`,
          form
        );
        toast.success("Question updated");
      } else {
        await axios.post("/spring-server/api/admin/mcq/add", form);
        toast.success("Question added");
      }

      closeModal();
      fetchQuestions();
    } catch {
      toast.error("Operation failed");
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyQuestion);
    (document.getElementById("mcq_modal") as HTMLDialogElement).showModal();
  };

  const openEditModal = (q: McqQuestion) => {
    setEditingId(q.questionId);
    setForm(q);
    (document.getElementById("mcq_modal") as HTMLDialogElement).showModal();
  };

  const closeModal = () => {
    setEditingId(null);
    setForm(emptyQuestion);
    (document.getElementById("mcq_modal") as HTMLDialogElement).close();
  };

  // ---------------- DELETE ----------------
  const softDelete = async (id: number) => {
    await axios.put(`/spring-server/api/admin/mcq/block/${id}`);
    toast.success("Question blocked");
    fetchQuestions();
  };

  const hardDelete = async (id: number) => {
    if (!confirm("Delete permanently?")) return;
    await axios.delete(`/spring-server/api/admin/mcq/delete/${id}`);
    toast.success("Question deleted");
    fetchQuestions();
  };

  return (
    <>
      <PageTitle title="Manage MCQ Questions" />

      {/* ---------------- SEARCH BAR ---------------- */}
      <fieldset className="fieldset container mx-auto px-10">
        <legend className="fieldset-legend">Search & Actions</legend>

        <div className="flex flex-wrap gap-4">
          <input
            className="input input-primary grow"
            placeholder="Search by question"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select select-primary grow"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <button className="btn btn-primary" onClick={openAddModal}>
            + Add Question
          </button>
        </div>
      </fieldset>

      {/* ---------------- LIST ---------------- */}
      <div className="container mx-auto px-10 mt-6">
        {loading ? (
          <p>Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-xl opacity-70">No questions found</p>
        ) : (
          <div className="grid gap-4">
            {filtered.map((q) => (
              <div
                key={q.questionId}
                className="card bg-base-200 border shadow"
              >
                <div className="card-body">
                  <div className="flex justify-between">
                    <h2 className="font-semibold">{q.questionText}</h2>
                    <span
                      className={`badge ${
                        q.active ? "badge-success" : "badge-error"
                      }`}
                    >
                      {q.active ? "Active" : "Blocked"}
                    </span>
                  </div>

                  <p className="opacity-70 text-sm">
                    Category: <strong>{q.category}</strong>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <p>A. {q.optionA}</p>
                    <p>B. {q.optionB}</p>
                    <p>C. {q.optionC}</p>
                    <p>D. {q.optionD}</p>
                  </div>

                  <p className="mt-2 text-sm">
                    Correct:{" "}
                    <strong className="text-primary">{q.correctOption}</strong>
                  </p>

                  <div className="card-actions justify-end mt-4">
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => openEditModal(q)}
                    >
                      Edit
                    </button>

                    <button
                      className={`btn btn-sm ${
                        q.active ? "btn-warning" : "btn-success"
                      }`}
                      onClick={() => softDelete(q.questionId)}
                    >
                      {q.active ? "Block" : "Unblock"}
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => hardDelete(q.questionId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- MODAL ---------------- */}
      <dialog id="mcq_modal" className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <h3 className="font-bold text-lg mb-4 text-center">
            {editingId ? "Edit MCQ Question" : "Add MCQ Question"}
          </h3>

          <div className="grid gap-4">
            <select
              className="select select-primary w-full"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="" disabled>
                Select Category
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <textarea
              className="textarea textarea-primary w-full"
              placeholder="Question text"
              value={form.questionText || ""}
              onChange={(e) =>
                setForm({ ...form, questionText: e.target.value })
              }
            />

            {["A", "B", "C", "D"].map((opt) => (
              <input
                key={opt}
                className="input input-primary w-full"
                placeholder={`Option ${opt}`}
                value={(form as any)[`option${opt}`] || ""}
                onChange={(e) =>
                  setForm({ ...form, [`option${opt}`]: e.target.value })
                }
              />
            ))}

            <select
              className="select select-primary w-full"
              value={form.correctOption}
              onChange={(e) =>
                setForm({ ...form, correctOption: e.target.value })
              }
            >
              <option value="A">Correct: A</option>
              <option value="B">Correct: B</option>
              <option value="C">Correct: C</option>
              <option value="D">Correct: D</option>
            </select>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={submitForm}>
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
