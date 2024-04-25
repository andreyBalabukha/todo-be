import pool from '../db';
import { Request, Response } from 'express';

export const getAllDuties = async (req: Request, res: Response) => {
  console.log('Fetching duties');
  try {
    const {rows} = await pool.query('SELECT * FROM todo');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching duties:', error);
    res.status(500).json({error: 'Failed to retrieve duties'});
  }
};

export const createDuty = async (req: Request, res: Response) => {
  const {title} = req.body;
  try {
    const {rows} = await pool.query(
      'INSERT INTO todo (guid, title) VALUES (gen_random_uuid(), $1) RETURNING *',
      [title]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating duty:', error);
    res.status(500).json({error: 'Failed to create duty'});
  }
};

export const updateDuty = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {completed} = req.body;
  try {
    const {rows} = await pool.query(
      'UPDATE todo SET completed = $1 WHERE id = $2 RETURNING *',
      [completed, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({error: 'Duty not found'});
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error updating duty:', error);
    res.status(500).json({error: 'Failed to update duty'});
  }
};

export const deleteDuty = async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    const {rowCount} = await pool.query('DELETE FROM todo WHERE id = $1', [
      id,
    ]);
    if (rowCount === 0) {
      return res.status(404).json({error: 'Duty not found'});
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting duty:', error);
    res.status(500).json({error: 'Failed to delete duty'});
  }
};

export const updateDutyTitle = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {title} = req.body;

  if (!title) {
    return res.status(400).json({error: 'Title is required.'});
  }

  try {
    const result = await pool.query(
      'UPDATE todo SET title = $1 WHERE id = $2 RETURNING *',
      [title, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({error: 'Task not found.'});
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task title:', error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};
