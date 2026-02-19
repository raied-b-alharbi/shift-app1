function App() {
  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ color: '#0070f3', fontSize: '2rem' }}>مبروك يا بطل! تم الرفع بنجاح 🚀</h1>
      <p style={{ color: '#666', marginTop: '10px' }}>موقع "مشرف المسائية" أصبح حياً الآن.</p>
      <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0', borderRadius: '8px' }}>
        <p>هذه نسخة التشغيل الأولية. يمكنك الآن البدء بإضافة ملفاتك الناقصة واحداً تلو الآخر.</p>
      </div>
    </div>
  );
}

export default App;
