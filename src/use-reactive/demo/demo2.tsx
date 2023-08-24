import React, { useEffect, useMemo } from 'react';
import { useReactive } from 'react-vueable';

type ClassType = {
  id: string;
  className: string;
  count: number;
};

type StudentType = {
  id: string;
  name: string;
  age?: number;
  classId: string;
};

const apiClassList = () => {
  return new Promise<ClassType[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', className: 'class1', count: 0 },
        { id: '2', className: 'class2', count: 0 },
      ]);
    }, 300);
  });
};

const apiStudentList = () => {
  return new Promise<StudentType[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', name: 'Neil', classId: '1' },
        { id: '2', name: 'Tom', classId: '1' },
        { id: '2', name: 'Eva', classId: '2' },
      ]);
    }, 500);
  });
};

export default () => {
  const data = useReactive<{ classes: ClassType[]; students: StudentType[] }>({
    classes: [],
    students: [],
  });

  const viewdatas = useMemo(() => {
    return data.students.map((student) => ({
      ...student,
      className: data.classes.find(($class) => $class.id === student.classId)?.className,
    }));
  }, [data.classes, data.students]);

  const fetchAll = async () => {
    const [classes, students] = await Promise.all([apiClassList(), apiStudentList()]);
    data.classes = classes;
    data.students = students;
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      {viewdatas.map((item) => (
        <div key={item.classId + item.id}>
          <span>name:{item.name}</span>;<span>className:{item.className}</span>
        </div>
      ))}
    </div>
  );
};
