import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_STUDENTS,
  INITIAL_BUSINESSES,
  INITIAL_PROJECTS,
  INITIAL_APPLICATIONS,
  INITIAL_CERTIFICATES,
  INITIAL_TRANSACTIONS
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current user state: default to Ananya Sharma (Student 1) for immediate interactive experience
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mi_current_user');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS[0];
  });

  const [userRole, setUserRole] = useState(() => {
    const saved = localStorage.getItem('mi_user_role');
    return saved || 'student'; // 'student' | 'business' | 'guest'
  });

  // Data states
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('mi_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [businesses, setBusinesses] = useState(() => {
    const saved = localStorage.getItem('mi_businesses');
    return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('mi_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('mi_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [certificates, setCertificates] = useState(() => {
    const saved = localStorage.getItem('mi_certificates');
    return saved ? JSON.parse(saved) : INITIAL_CERTIFICATES;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('mi_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [savedProjectIds, setSavedProjectIds] = useState(() => {
    const saved = localStorage.getItem('mi_saved_projects');
    return saved ? JSON.parse(saved) : ['proj_1', 'proj_4'];
  });

  // Current view/page state
  const [currentPage, setCurrentPage] = useState('landing'); // landing, find-projects, project-details, for-businesses, how-it-works, about, student-dashboard, business-dashboard, login, signup
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeDashboardTab, setActiveDashboardTab] = useState('overview');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('mi_current_user', JSON.stringify(currentUser));
    localStorage.setItem('mi_user_role', userRole);
  }, [currentUser, userRole]);

  useEffect(() => {
    localStorage.setItem('mi_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('mi_businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('mi_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('mi_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('mi_certificates', JSON.stringify(certificates));
  }, [certificates]);

  useEffect(() => {
    localStorage.setItem('mi_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('mi_saved_projects', JSON.stringify(savedProjectIds));
  }, [savedProjectIds]);

  // Auth functions
  const login = (role, user) => {
    setUserRole(role);
    setCurrentUser(user);
    if (role === 'student') {
      setCurrentPage('student-dashboard');
      setActiveDashboardTab('overview');
    } else if (role === 'business') {
      setCurrentPage('business-dashboard');
      setActiveDashboardTab('overview');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole('guest');
    setCurrentPage('landing');
  };

  const switchDemoUser = (id, role) => {
    if (role === 'student') {
      const student = students.find((s) => s.id === id) || INITIAL_STUDENTS[0];
      setUserRole('student');
      setCurrentUser(student);
      setCurrentPage('student-dashboard');
      setActiveDashboardTab('overview');
    } else if (role === 'business') {
      const business = businesses.find((b) => b.id === id) || INITIAL_BUSINESSES[0];
      setUserRole('business');
      setCurrentUser(business);
      setCurrentPage('business-dashboard');
      setActiveDashboardTab('overview');
    } else {
      logout();
    }
  };

  // Toggle saving projects
  const toggleSaveProject = (projectId) => {
    setSavedProjectIds((prev) => {
      const exists = prev.includes(projectId);
      if (exists) {
        return prev.filter((id) => id !== projectId);
      } else {
        return [...prev, projectId];
      }
    });
  };

  // Apply to project
  const applyToProject = (projectId, coverNote, portfolioLink) => {
    if (!currentUser || userRole !== 'student') {
      return { success: false, message: 'Please log in as a student to apply.' };
    }

    const project = projects.find((p) => p.id === projectId);
    if (!project) return { success: false, message: 'Project not found.' };

    const alreadyApplied = applications.some(
      (a) => a.projectId === projectId && a.studentId === currentUser.id
    );
    if (alreadyApplied) {
      return { success: false, message: 'You have already applied for this micro-internship!' };
    }

    const newApp = {
      id: `app_${Date.now()}`,
      projectId: project.id,
      projectTitle: project.title,
      businessId: project.businessId,
      businessName: project.businessName,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentAvatar: currentUser.avatar,
      studentCollege: currentUser.college,
      studentSkills: currentUser.skills,
      studentRating: currentUser.rating,
      payment: project.payment,
      duration: project.duration,
      workType: project.workType,
      appliedDate: new Date().toISOString().split('T')[0],
      coverNote: coverNote || "I am enthusiastic about this project and have relevant skills to deliver high quality results.",
      portfolioLink: portfolioLink || currentUser.portfolio || "",
      status: "Under Review"
    };

    setApplications((prev) => [newApp, ...prev]);

    // Increase project applicant count
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, applicantsCount: p.applicantsCount + 1 } : p))
    );

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }

    return { success: true, message: 'Application submitted successfully! You can track your application from My Applications.' };
  };

  // Post a new project (Business)
  const postProject = (projectData) => {
    const newProj = {
      id: `proj_${Date.now()}`,
      title: projectData.title,
      businessId: currentUser?.id || 'business_1',
      businessName: currentUser?.name || 'GreenLeaf Café',
      businessLogo: currentUser?.logo || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80',
      verified: true,
      category: projectData.category,
      description: projectData.description,
      skills: Array.isArray(projectData.skills)
        ? projectData.skills
        : projectData.skills.split(',').map((s) => s.trim()),
      duration: projectData.duration,
      durationDays: parseInt(projectData.duration) || 4,
      payment: Number(projectData.payment),
      workType: projectData.workType,
      location: projectData.location || "Remote",
      difficulty: projectData.difficulty || "Intermediate",
      applicantsCount: 0,
      positions: Number(projectData.positions) || 1,
      deadline: projectData.deadline || "2026-10-15",
      postedDate: new Date().toISOString().split('T')[0],
      status: "Open",
      featured: false,
      requirements: projectData.requirements || ["Commitment to timely delivery", "Strong communication"],
      deliverables: projectData.deliverables || ["Final project files", "Summary handover"]
    };

    setProjects((prev) => [newProj, ...prev]);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return { success: true, message: 'Your project has been published successfully!' };
  };

  // Business accepts an application
  const acceptApplication = (appId) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: "Accepted",
            acceptedDate: new Date().toISOString().split('T')[0],
            progress: 20
          };
        }
        return app;
      })
    );

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    return { success: true, message: "Applicant accepted! The project is now active in your dashboard." };
  };

  // Business rejects an application
  const rejectApplication = (appId) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: "Rejected" } : app))
    );
    return { success: true, message: "Application status updated to Not Selected." };
  };

  // Student submits progress or work
  const submitProjectWork = (appId, submissionNote, workLink) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            progress: 100,
            submissionNote,
            workLink: workLink || "https://github.com/ananya-dev/submission-branch",
            submittedDate: new Date().toISOString().split('T')[0]
          };
        }
        return app;
      })
    );
    return { success: true, message: "Work submitted successfully! The business has been notified for final review." };
  };

  // Business marks project as Completed -> generates Certificate, releases payment
  const completeProjectAndPay = (appId, ratingScore = 5, reviewText = "") => {
    const targetApp = applications.find((a) => a.id === appId);
    if (!targetApp) return { success: false, message: "Application not found" };

    const certId = `MI-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // 1. Update application
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: "Completed",
            paymentStatus: "Completed",
            completedDate: new Date().toISOString().split('T')[0],
            certificateId: certId,
            businessRatingScore: ratingScore,
            studentReviewText: reviewText || "Exceptional work quality, timely turnaround, and great communication!"
          };
        }
        return app;
      })
    );

    // 2. Generate Certificate
    const newCert = {
      id: `cert_${Date.now()}`,
      certificateNumber: certId,
      studentId: targetApp.studentId,
      studentName: targetApp.studentName,
      businessId: targetApp.businessId,
      businessName: targetApp.businessName,
      businessSigner: `${targetApp.businessName} Team Lead`,
      projectTitle: targetApp.projectTitle,
      category: "Micro-Internship Project",
      duration: targetApp.duration || "4 Days",
      completedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      skillsDemonstrated: targetApp.studentSkills?.slice(0, 4) || ["Problem Solving", "Professional Delivery"],
      grade: "Grade A+ (Distinction)",
      issuer: "MicroIntern Credentials Verification",
      verificationUrl: `https://microintern.io/verify/${certId}`
    };

    setCertificates((prev) => [newCert, ...prev]);

    // 3. Add to Transactions
    const newTx = {
      id: `tx_${Date.now()}`,
      studentId: targetApp.studentId,
      projectTitle: targetApp.projectTitle,
      businessName: targetApp.businessName,
      amount: targetApp.payment,
      date: new Date().toISOString().split('T')[0],
      status: "Completed",
      method: "UPI Direct Transfer",
      referenceId: `UPI/${Date.now().toString().slice(-6)}/OK`
    };

    setTransactions((prev) => [newTx, ...prev]);

    // 4. Update student profile earnings & stats
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === targetApp.studentId) {
          return {
            ...s,
            totalEarnings: s.totalEarnings + targetApp.payment,
            pendingEarnings: Math.max(0, s.pendingEarnings - targetApp.payment),
            completedProjectsCount: s.completedProjectsCount + 1,
            activeProjectsCount: Math.max(0, s.activeProjectsCount - 1)
          };
        }
        return s;
      })
    );

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (e) {}

    return {
      success: true,
      message: `Project marked as Completed! Payment of ₹${targetApp.payment.toLocaleString('en-IN')} has been released and a digital certificate has been issued.`
    };
  };

  // Student rates business
  const rateBusiness = (appId, rating, reviewText) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            studentRated: true,
            studentRatingScore: rating,
            businessReviewText: reviewText
          };
        }
        return app;
      })
    );
    return { success: true, message: "Thank you! Your rating and feedback have been published." };
  };

  // Update student profile
  const updateStudentProfile = (updatedData) => {
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    return { success: true, message: "Profile updated successfully!" };
  };

  // Update business profile
  const updateBusinessProfile = (updatedData) => {
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setBusinesses((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    return { success: true, message: "Business profile updated successfully!" };
  };

  // Navigation helpers
  const navigateTo = (page, projectId = null, tab = 'overview') => {
    setCurrentPage(page);
    if (projectId) setSelectedProjectId(projectId);
    if (tab) setActiveDashboardTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userRole,
        currentPage,
        selectedProjectId,
        activeDashboardTab,
        students,
        businesses,
        projects,
        applications,
        certificates,
        transactions,
        savedProjectIds,
        // Actions
        login,
        logout,
        switchDemoUser,
        navigateTo,
        setActiveDashboardTab,
        setSelectedProjectId,
        toggleSaveProject,
        applyToProject,
        postProject,
        acceptApplication,
        rejectApplication,
        submitProjectWork,
        completeProjectAndPay,
        rateBusiness,
        updateStudentProfile,
        updateBusinessProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
