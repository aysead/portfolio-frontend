import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Box, Typography, Grid, Chip } from "@mui/material";
import { ArrowLeft, ArrowUpRight, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Note {
  _id: string;
  question: string;
  description: string;
  category: string;
  color: string;
}

const filterCategories = [
  { name: "All", label: "Tümü", color: "#1a1a1a" },
  { name: "Frontend", label: "Frontend", color: "#3b82f6" },
  { name: "Backend", label: "Backend", color: "#10b981" },
  { name: "Database", label: "Database", color: "#f59e0b" },
  { name: "Network", label: "Network", color: "#8b5cf6" },
  { name: "System", label: "System", color: "#ef4444" }
];

function FlipNoteCard({ note }: { note: Note }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box
      onClick={() => setIsFlipped(!isFlipped)}
      sx={{
        perspective: "1000px", 
        height: "100%",
        minHeight: "320px", 
        cursor: "pointer",
        "&:hover .flip-icon": {
          transform: "rotate(180deg)",
          transition: "transform 0.4s ease",
        }
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d", 
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden", 
            backgroundColor: "#fff",
            padding: "30px",
            border: "1px solid #eaeaea",
            borderTop: `4px solid ${note.color}`,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 4px 10px rgba(0,0,0,0.03)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="overline" sx={{ color: note.color, fontWeight: 700 }}>
              {note.category}
            </Typography>
            <ArrowUpRight size={16} color="#ccc" />
          </Box>
          
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2, fontSize: '1.4rem', textAlign: 'center', lineHeight: 1.4 }}>
              {note.question}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pt: 2, borderTop: '1px solid #f0f0f0' }}>
            <Typography variant="overline" sx={{ fontSize: '0.6rem', color: '#ccc', display: 'flex', alignItems: 'center', gap: 1 }}>
              <RotateCcw size={12} className="flip-icon" /> Cevabı Gör
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)", 
            backgroundColor: "#fff",
            padding: "30px",
            border: `2px solid ${note.color}`,
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            boxShadow: `0 10px 25px ${note.color}20`, 
            overflowY: "auto", 
          }}
        >
          <Typography variant="overline" sx={{ color: note.color, mb: 2, borderBottom: `1px solid ${note.color}40`, pb: 1 }}>
            Açıklama
          </Typography>
          <Typography variant="body2" sx={{ color: '#1a1a1a', lineHeight: 1.8, fontSize: '1rem' }}>
            {note.description}
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
}

export default function NotesPage({ notes, t }: any) {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNotes = activeFilter === "All" 
    ? notes 
    : notes.filter((note: Note) => note.category === activeFilter);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -100 }} 
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ minHeight: '100vh', backgroundColor: '#fcfcfc', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 8, cursor: 'pointer', width: 'fit-content' }} onClick={() => navigate('/')}>
          <ArrowLeft size={20} color="#92400e" style={{ marginRight: '10px' }} />
          <Typography variant="overline" sx={{ '&:hover': { color: '#000' } }}>Ana Sayfaya Dön</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'flex-end' }, mb: 8, gap: 4 }}>
          <Box>
            <Typography variant="overline" sx={{ color: '#999', display: 'block', mb: 1 }}>Knowledge Base</Typography>
            <Typography variant="h2">{t.notes}</Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {filterCategories.map((cat) => (
              <Chip 
                key={cat.name}
                label={cat.label}
                onClick={() => setActiveFilter(cat.name)}
                sx={{ 
                  borderRadius: 0, 
                  fontFamily: '"Space Grotesk", sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s ease',
                  backgroundColor: activeFilter === cat.name ? cat.color : 'transparent',
                  color: activeFilter === cat.name ? '#fff' : '#666',
                  border: `1px solid ${activeFilter === cat.name ? cat.color : '#eaeaea'}`,
                  '&:hover': {
                    backgroundColor: activeFilter === cat.name ? cat.color : '#f5f5f5',
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        <Grid container spacing={4}>
          <AnimatePresence mode="popLayout">
            {filteredNotes.length === 0 ? (
              <Grid size={{ xs: 12 }}>
                <Typography variant="body1" sx={{ color: '#999', fontStyle: 'italic', textAlign: 'center', py: 10 }}>
                  Bu kategoride henüz bir kayıt bulunmuyor.
                </Typography>
              </Grid>
            ) : (
              filteredNotes.map((note: Note, index: number) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={note._id}>
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.9 }} 
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{ height: '100%' }} 
                  >
                    <FlipNoteCard note={note} />
                  </motion.div>
                </Grid>
              ))
            )}
          </AnimatePresence>
        </Grid>
      </Container>
    </motion.div>
  );
}