import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const todosFilePath = path.join(process.cwd(), 'data', 'todos.json');

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const readTodosFile = () => {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(todosFilePath)) {
      const initialData = { todos: [] };
      fs.writeFileSync(todosFilePath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const fileContent = fs.readFileSync(todosFilePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading todos file:', error);
    return { todos: [] };
  }
};

const writeTodosFile = (data) => {
  try {
    ensureDataDirectory();
    fs.writeFileSync(todosFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing todos file:', error);
    return false;
  }
};

export async function GET() {
  try {
    const todosData = readTodosFile();
    return NextResponse.json(todosData);
  } catch (error) {
    console.error('Error in GET /api/todos:', error);
    return NextResponse.json(
      { error: 'Failed to read todos' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { todos } = body;

    if (!Array.isArray(todos)) {
      return NextResponse.json(
        { error: 'Todos must be an array' },
        { status: 400 }
      );
    }

    const todosData = { todos };
    const success = writeTodosFile(todosData);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save todos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: 'Todos saved successfully',
      todos: todosData.todos 
    });
  } catch (error) {
    console.error('Error in POST /api/todos:', error);
    return NextResponse.json(
      { error: 'Failed to save todos' },
      { status: 500 }
    );
  }
}