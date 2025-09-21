import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventPage from './events/EventPage';
import { GuestListPage } from './guests/GuestListPage';
import GuestActionPage from './guests/GuestActionPage';
import { EventsActionPage } from './events/EventsActionPage';
import GuestListInvite from './guests/GuestListInvite';
import { GuestInvitePage } from './guests/GuestInvitePage';
import HomePage from './home/HomePage';
import EventListPage from './events/EventListPage';
import { UserRegisterPage } from './user/UserRegisterPage';

// Componente principal da aplicação
function App() {
  return (
    <div>
      {/* Modern Navigation */}
      <nav className="modern-nav">
        <div className="modern-nav-content">
          <a href="/">Home</a>
          <a href="/events">Eventos</a>
          <a href="/events">Tipos de Eventos</a>
          <a href="/events">Gerenciar</a>
          <a href="/register">Conta</a>
        </div>
      </nav>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rsvp/:id" element={<GuestInvitePage />} />
            <Route path="/events/:id" element={<EventPage />} />
            <Route path="/events" element={<EventListPage />} />
            <Route path="/register" element={<UserRegisterPage />} />
            <Route path="/events/:id/edit" element={<EventsActionPage />} />
            <Route path="/events/:eventId/guests" element={<GuestListPage />} />
            <Route path="/events/:eventId/guests/invite" element={<GuestListInvite />} />
            <Route path="/events/:eventId/guests/:guestId" element={<GuestActionPage />} />
            <Route path="/events/:eventId/guests/new" element={<GuestActionPage />} />
          </Routes>
        </BrowserRouter>
  </div>
  );
}

export default App;
