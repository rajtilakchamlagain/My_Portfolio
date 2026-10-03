content = open('index.html','rb').read().decode('utf-8')
old = '<div class="timeline-item">\n                    <div class="timeline-date">2026 &mdash; Present</div>'
new = '<div class="timeline-item" onclick="openDesignGallery()" style="cursor:pointer;" title="Click to view design work">\n                    <div class="timeline-date">2026 &mdash; Present</div>'
if old in content:
    content = content.replace(old, new, 1)
    open('index.html','wb').write(content.encode('utf-8'))
    print('REPLACED OK')
else:
    print('NOT FOUND - trying CRLF')
    old2 = old.replace('\n', '\r\n')
    new2 = new.replace('\n', '\r\n')
    if old2 in content:
        content = content.replace(old2, new2, 1)
        open('index.html','wb').write(content.encode('utf-8'))
        print('REPLACED WITH CRLF OK')
    else:
        print('STILL NOT FOUND')
        idx = content.find('2026 &mdash; Present')
        print(repr(content[idx-200:idx+100]))
