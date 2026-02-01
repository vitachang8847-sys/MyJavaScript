import { Link, useNavigate, useLocation } from 'react-router';
import './pages/NotFound/NotFound.css';

export default function NotFound() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="not-found">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2>🔍 找不到此頁面</h2>
        <p>您訪問的路徑 <code>{location.pathname}</code> 不存在</p>
        
        <div className="error-actions">
          <button onClick={() => navigate(-1)} className="btn-back">
            ← 返回上一頁
          </button>
          <Link to="/lesson01" className="btn-home">
            🏠 回到首頁
          </Link>
        </div>
      </div>
    </div>
  );
}
