import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { 
  ThemeProvider, createTheme, CssBaseline, 
  AppBar, Toolbar, Typography, Box, Grid, Container, IconButton,
  Drawer, List, ListItem 
} from "@mui/material";
import { Terminal, ArrowUpRight, Trash2, Menu, X, ArrowLeft } from "lucide-react";
import "./App.css"; 
import { translations } from "./translations";
import NotesPage from "./pages/NotesPage";

const editorialTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
    h1: { fontFamily: '"Playfair Display", serif', fontWeight: 400 },
    h2: { fontFamily: '"Playfair Display", serif', fontWeight: 400, fontStyle: 'italic' },
    h3: { fontFamily: '"Playfair Display", serif', fontWeight: 400 },
    h4: { fontFamily: '"Playfair Display", serif', fontWeight: 600, fontStyle: 'italic' },
    overline: { letterSpacing: '0.3em', fontWeight: 600, color: '#999' }
  },
  palette: {
    background: { default: '#fcfcfc', paper: '#ffffff' },
    primary: { main: '#92400e' },
    text: { primary: '#1a1a1a', secondary: '#666666' }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          borderBottom: '1px solid #eaeaea',
          color: '#1a1a1a'
        }
      }
    }
  }
});

interface Note {
  _id: string;
  question: string;
  description: string;
  category: string;
  color: string;
}

function StatCounter({ end, title, suffix = "" }: { end: number, title: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / 2000, 1);
      setCount(Math.floor(end * percentage));
      if (progress < 2000) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end]);
  return (
    <Box sx={{ p: 4, textAlign: 'center', borderRight: { md: '1px solid #eaeaea' } }}>
      <Typography variant="h3" sx={{ color: 'primary.main', mb: 1, fontStyle: 'italic' }}>{count}{suffix}</Typography>
      <Typography variant="overline" sx={{ fontSize: '0.65rem' }}>{title}</Typography>
    </Box>
  );
}

function Home({ notes, lang, setLang, t }: any) {
  const [showSplash, setShowSplash] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate(); 
  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>

      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 8 } }}>
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 700, letterSpacing: '0.2em' }}>
            AYSE A. DAGCI <span style={{ fontWeight: 300, fontSize: '0.8rem', color: '#999' }}>FULL STACK DEVELOPER</span>
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              <Typography variant="overline" sx={{ cursor: 'pointer', '&:hover': { color: '#000', fontStyle: 'italic' } }}>
                <a href="https://github.com/aysead" target="_blank" rel="noopener noreferrer">{t.projects}</a>
              </Typography>
              <Typography variant="overline" sx={{ cursor: 'pointer', '&:hover': { color: '#000', fontStyle: 'italic' } }} onClick={() => navigate('/notes')}>
                {t.notes}
              </Typography>
              <Typography variant="overline" sx={{ cursor: 'pointer', '&:hover': { color: '#000', fontStyle: 'italic' } }}>
                <a href="https://medium.com/@ayseasenakarauz" target="_blank" rel="noopener noreferrer">{t.articles}</a>
              </Typography>
            </Box>

            <IconButton onClick={() => setLang(lang === 'en' ? 'tr' : 'en')} sx={{ fontSize: '1.2rem' }}>
              {lang === 'en' ? '🇹🇷' : '🇬🇧'}
            </IconButton>

            <IconButton onClick={toggleMobileMenu} sx={{ display: { xs: 'flex', md: 'none' }, color: '#1a1a1a' }}>
              <Menu size={28} strokeWidth={1.5} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu} PaperProps={{ sx: { width: '100%', maxWidth: 320, backgroundColor: '#fcfcfc', p: 4 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 6 }}>
          <IconButton onClick={toggleMobileMenu} sx={{ color: '#1a1a1a' }}><X size={28} strokeWidth={1.5} /></IconButton>
        </Box>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'right' }}>
          <ListItem disablePadding sx={{ justifyContent: 'flex-end' }}>
            <Typography variant="h4" sx={{ cursor: 'pointer' }}><a href="https://github.com/aysead" target="_blank" rel="noopener noreferrer">{t.projects}</a></Typography>
          </ListItem>
          <ListItem disablePadding sx={{ justifyContent: 'flex-end' }}>
             <Typography variant="h4" sx={{ cursor: 'pointer' }} onClick={() => { navigate('/notes'); toggleMobileMenu(); }}>{t.notes}</Typography>
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, pt: '64px', borderBottom: '1px solid #eaeaea' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 4, md: 10 } }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Typography variant="overline" sx={{ color: 'primary.main', mb: 2, display: 'block' }}>{t.basedIn}</Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, lineHeight: 1.1, mb: 3 }}>
              Code & <br /><span style={{ color: '#999', fontStyle: 'italic' }}>Architecture.</span>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, fontStyle: 'italic', lineHeight: 1.8 }}>{t.heroDesc}</Typography>
          </motion.div>
        </Box>
        <Box sx={{ flex: 1, backgroundColor: '#f9f9f9', borderLeft: { md: '1px solid #eaeaea' }, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', minHeight: { xs: '40vh', md: 'auto' } }}>
          <Typography sx={{ position: 'absolute', fontSize: '15vw', fontFamily: '"Playfair Display", serif', fontStyle: 'italic', color: 'rgba(0,0,0,0.03)', userSelect: 'none' }}>System</Typography>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 2.5 }}>
            <Box sx={{ backgroundColor: '#fff', p: 5, border: '1px solid #eaeaea', zIndex: 10, position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <Terminal size={60} color="#92400e" strokeWidth={1} />
            </Box>
          </motion.div>
        </Box>
      </Box>

      <Box sx={{ borderBottom: '1px solid #eaeaea', backgroundColor: '#fff' }}>
        <Container maxWidth="xl" disableGutters>
          <Grid container>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><StatCounter end={4} title={t.stats.projects} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><StatCounter end={notes.length} title={t.stats.notes} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}><StatCounter end={3} title={t.stats.articles} /></Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ borderRight: 'none !important' }}><StatCounter end={1200} title={t.stats.lines} suffix="+" /></Grid>
          </Grid>
        </Container>
      </Box>
    </motion.div>
  );
}

function AnimatedRoutes({ notes, lang, setLang, t }: any) {
  const location = useLocation(); 
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home notes={notes} lang={lang} setLang={setLang} t={t} />} />
        <Route path="/notes" element={<NotesPage notes={notes} t={t} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'tr'>('en'); 
  const [notes, setNotes] = useState<Note[]>([]);
  const t = translations[lang];

  useEffect(() => {
    axios.get("http://localhost:5000/api/notes")
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <ThemeProvider theme={editorialTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AnimatedRoutes notes={notes} lang={lang} setLang={setLang} t={t} />
      </BrowserRouter>
    </ThemeProvider>
  );
}