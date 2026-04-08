const Secret = require('../models/Secret');

function normalizePath(path) {
    if (path.length > 1 && path.endsWith('/')) {
        return path.slice(0, -1);
    }
    return path;
}

exports.getSecret = async (req, res) => {
    try {
        const path = normalizePath(req.path);

        const secret = await Secret.findOne({ path });

        const children = await Secret.find({
            path: { $regex: `^${path}/` }
        }).select('path');

        const menuSet = new Set();

        children.forEach(item => {
            const rest = item.path.substring(path.length + 1);

            const nextSlashIndex = rest.indexOf('/');
            const next =
                nextSlashIndex === -1
                    ? rest
                    : rest.substring(0, nextSlashIndex);

            if (next) {
                menuSet.add(next);
            }
        });

        res.json({
            text: secret?.text || '',
            updatedAt: secret?.updatedAt || null,
            menu: Array.from(menuSet).sort(),
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSecret = async (req, res) => {
    try {
        const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const path = req.path.endsWith('/')
            ? req.path.slice(0, -1)
            : req.path;

        const secret = await Secret.findOneAndUpdate(
            { path },
            {
                text: req.body.text,
                ip: clientIP
            },
            {
                new: true,
                upsert: true
            }
        );

        res.status(201).json({ id: secret._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};