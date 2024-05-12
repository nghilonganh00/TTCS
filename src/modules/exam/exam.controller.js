import { getDatabase, ref, get } from 'firebase/database';
import { Timestamp, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebase/firebase-config';
import { handleGetCommentByExamId } from '../comment/comment.service';
import {
  handelGetQuestionById,
  handleAddExam,
  handleDeleteExam,
  handleEditExam,
  handleGetAllExamGeneralInfo,
  handleGetCorrectAnswersByExamId,
  handleGetExamGeneralInfoById,
} from './exam.service';
import { handleAddExamHistory } from '../examHistory/examHistory.service';
import { formatDate } from '../../utils/date';
import ExamDAO from './exam.DAO';
import ExamHistoryDAO from '../examHistory/examHistory.DAO';

const getPreviewExam = async (req, res) => {
  try {
    const data = await handleGetAllExamGeneralInfo();
    return res.status(200).json({
      data: data,
      message: 'Get preview exam successful',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const getDetailExamById = async (req, res) => {
  try {
    const { examId, userId } = req.query;

    const generalInfo = await handleGetExamGeneralInfoById(examId);

    const db = getDatabase();
    const dbRef = ref(db, `toeic/${examId}`);
    const snapshot = await get(dbRef);

    const examHistory = await ExamHistoryDAO.getAll(userId, examId);

    const comments = await handleGetCommentByExamId(examId);

    await ExamDAO.increasePracticeTotal(examId);

    if (snapshot.exists()) {
      const exam = snapshot.val();
      return res.status(200).json({
        data: {
          generalInfo,
          exam,
          history: examHistory,
          comments: comments,
        },
        message: 'Get detail exam successful',
      });
    } else {
      return res.status(404).json({
        data: null,
        message: 'No data available',
      });
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const gradeExam = async (req, res) => {
  try {
    const { examId, userId, parts, spentTime, userAnswers } = req.body;
    const listPart = parts[0] === 'All' ? ['part1', 'part2', 'part3', 'part4', 'part5', 'part6', 'part7'] : parts;
    const correctAnswers = await handleGetCorrectAnswersByExamId(examId);

    let result = {};
    let listeningCorrect = 0;
    let readingCorrect = 0;
    let questionTotal = 0;
    for (const part of listPart) {
      result[part] = {};

      for (const questionNumber in correctAnswers[part]) {
        const userAnswer = userAnswers[part][questionNumber] || 'E';
        const correctAnswer = correctAnswers[part][questionNumber];

        result[part][questionNumber] = {
          userAnswer: userAnswer,
          correctAnswer: correctAnswer,
        };

        if (userAnswer === correctAnswer) {
          if (['part1', 'part2', 'part3', 'part4'].includes(part)) {
            listeningCorrect++;
          } else {
            readingCorrect++;
          }
        }

        questionTotal++;
      }
    }

    const data = {
      parts: parts,
      examId: examId,
      userId: userId,
      result: result,
      correctTotal: listeningCorrect + readingCorrect,
      questionTotal: questionTotal,
      spentTime: spentTime,
      examedAt: Timestamp.now(),
    };

    if (parts[0] === 'All') {
      data['listeningCorrect'] = listeningCorrect;
      data['readingCorrect'] = readingCorrect;
      data['listeningScore'] = listeningCorrect * 4;
      data['readingScore'] = readingCorrect * 4;
      data['totalScore'] = data['listeningScore'] + data['readingScore'];
    } else {
      data['listeningCorrect'] = 0;
      data['readingCorrect'] = 0;
      data['listeningScore'] = 0;
      data['readingScore'] = 0;
      data['totalScore'] = 0;
    }

    const examHistoryId = await handleAddExamHistory(data);
    return res.status(200).json({
      data: {
        examHistoryId: examHistoryId,
      },
      message: 'Grade user exam successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error,
    });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id, part, question_id } = req.params;
    const data = await handelGetQuestionById(id, part, question_id);
    return res.status(200).json({
      data: data,
      message: 'Get preview exam successful',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const addExam = async (req, res) => {
  try {
    const { examTitle, examYear } = req.body;
    const data = await handleAddExam(examTitle, examYear);
    return res.status(200).json({
      data: data,
      message: 'Add new exam successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const editExam = async (req, res) => {
  try {
    const { examId, examTitle, examYear } = req.body;
    const data = await handleEditExam(examId, examTitle, examYear);
    return res.status(200).json({
      data: data,
      message: 'Add new exam successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

const deleteExam = async (req, res) => {
  try {
    const { examId } = req.body;
    const data = await handleDeleteExam(examId);
    return res.status(200).json({
      data: data,
      message: 'Add new exam successfully',
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: 'Internal server error',
    });
  }
};

export default { getPreviewExam, getDetailExamById, gradeExam, getQuestionById, addExam, editExam, deleteExam };
