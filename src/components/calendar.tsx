"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

/* =======================
   Tipos no se si dejarlos aqui o no ?
   ======================= */
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type SelectedDate = {
  year: number;
  month: number; // 0-11
  day: number;
} | null;

type TasksState = Record<string, Task[]>;

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(null);
  const [tasks, setTasks] = useState<TasksState>({});
  const [newTask, setNewTask] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ] as const;

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"] as const;

  const getDaysInMonth = (
    date: Date,
  ): { daysInMonth: number; startingDayOfWeek: number } => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const formatDateKey = (year: number, month: number, day: number): string => {
    // month is 0-11 internally; guardamos como MM con 1-based
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);

  const previousMonth = (): void => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
    );
  };

  const nextMonth = (): void => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
    );
  };

  const handleDayClick = (day: number): void => {
    setSelectedDate({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth(),
      day,
    });
    setIsDialogOpen(true);
  };

  const addTask = (): void => {
    if (!newTask.trim() || !selectedDate) return;

    const dateKey = formatDateKey(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day,
    );
    const newEntry: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] ?? []), newEntry],
    }));
    setNewTask("");
  };

  const deleteTask = (dateKey: string, taskId: number): void => {
    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].filter((task) => task.id !== taskId),
    }));
  };

  const toggleTask = (dateKey: string, taskId: number): void => {
    setTasks((prev) => ({
      ...prev,
      [dateKey]: prev[dateKey].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    }));
  };

  const renderCalendarDays = (): React.ReactNode[] => {
    const days: React.ReactNode[] = [];

    // celdas vacías antes del primer día
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="h-24 border border-gray-200"
          aria-hidden
        />,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      const dayTasks: Task[] = tasks[dateKey] ?? [];

      const isToday =
        new Date().toDateString() ===
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day,
        ).toDateString();

      days.push(
        <div
          key={day}
          onClick={() => handleDayClick(day)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleDayClick(day);
            }
          }}
          className={`h-24 border border-gray-200 p-2 cursor-pointer hover:bg-gray-50 transition-colors ${
            isToday ? "bg-blue-50 border-blue-300" : ""
          }`}
        >
          <div
            className={`font-semibold mb-1 ${isToday ? "text-blue-600" : ""}`}
          >
            {day}
          </div>
          <div className="space-y-1 overflow-hidden">
            {dayTasks.slice(0, 2).map((task: Task) => (
              <div
                key={task.id}
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded truncate"
              >
                {task.text}
              </div>
            ))}
            {dayTasks.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayTasks.length - 2} más
              </div>
            )}
          </div>
        </div>,
      );
    }

    return days;
  };

  const selectedDateKey: string | null = selectedDate
    ? formatDateKey(selectedDate.year, selectedDate.month, selectedDate.day)
    : null;

  const selectedDateTasks: Task[] = selectedDateKey
    ? (tasks[selectedDateKey] ?? [])
    : [];

  return (
    <div className="min-h-screen bg-white px-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-7 gap-0 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center font-semibold py-2 bg-gray-100 border border-gray-200"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => setIsDialogOpen(open)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedDate
                ? `${selectedDate.day} de ${monthNames[selectedDate.month]} ${selectedDate.year}`
                : "Selecciona una fecha"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Nueva tarea..."
                value={newTask}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewTask(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") addTask();
                }}
              />
              <Button onClick={addTask} size="icon" aria-label="Agregar tarea">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {selectedDateTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No hay tareas para este día
                </p>
              ) : (
                selectedDateTasks.map((task: Task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        if (!selectedDateKey) return;
                        toggleTask(selectedDateKey, task.id);
                      }}
                      className="h-4 w-4 cursor-pointer"
                      aria-label={`Marcar tarea ${task.text}`}
                    />
                    <span
                      className={`flex-1 ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (!selectedDateKey) return;
                        deleteTask(selectedDateKey, task.id);
                      }}
                      className="h-8 w-8 text-red-500 hover:text-red-700"
                      aria-label="Eliminar tarea"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
